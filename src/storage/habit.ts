import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";

import { type Habit, type HabitListByDate } from "../data/habits";

export async function getHabits(query?: string) {
  await fakeNetwork(`getHabits:${query}`);
  let habits = (await localforage.getItem("habits")) as HabitListByDate[];
  if (!habits) habits = [];
  if (query) {
    habits = matchSorter(habits, query, { keys: ["dateString"] });
  }
  return habits.sort(sortBy("last", "createdAt"));
}

export async function getHabitsByDate(dateString: string) {
  await fakeNetwork(`:${dateString}`);
  const habits = (await localforage.getItem("habits")) as HabitListByDate[];
  if (!habits) {
    return null;
  }
  const habit = habits.find((habit) => habit.dateString === dateString);
  return habit;
}

export async function createHabit(dateString: string) {
  await fakeNetwork(`:${dateString}`);

  const newHabitItem: Habit = {
    id: crypto.randomUUID(),
    name: "Title",
    description: "Description",
    isDone: false,
    time: "00:00",
    createdAt: Date.now(),
  };

  const newHabitDate: HabitListByDate = {
    dateString: dateString,
    items: [newHabitItem],
  };

  const habits = await getHabits();
  const habitIndex = habits.findIndex(
    (habit) => habit.dateString === newHabitDate.dateString
  );

  if (habitIndex === -1) {
    habits.push(newHabitDate);
  } else {
    habits[habitIndex].items.push(newHabitItem);
  }
  await set(habits);
  return habits;
}

export async function deleteItemHabit(dateString: string, id: string) {
  const habits = (await localforage.getItem("habits")) as HabitListByDate[];
  const habit = habits.find((habit) => habit.dateString === dateString);
  if (!habit) {
    return;
  }

  const habitItemIndex = habit.items.findIndex((item) => item.id === id);
  console.log({ habitItemIndex });

  if (habitItemIndex > -1) {
    if (habit.items.length === 1) {
      const habitIndex = habits.findIndex(
        (habit) => habit.dateString === dateString
      );
      habits.splice(habitIndex, 1);
    } else {
      habit.items.splice(habitItemIndex, 1);
    }

    await set(habits);
    return true;
  }
  return false;
}

function set(habits: HabitListByDate[]) {
  return localforage.setItem("habits", habits);
}

// fake a cache so we don't slow down stuff we've already seen
let fakeCache = {};

async function fakeNetwork(key: string) {
  if (!key) {
    fakeCache = {};
  }

  // @ts-expect-error Later
  if (fakeCache[key]) {
    return;
  }

  // @ts-expect-error Later
  fakeCache[key] = true;
  return new Promise((res) => {
    setTimeout(res, Math.random() * 800);
  });
}
