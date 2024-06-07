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
  const habit = habits.find((habit) => habit.dateString === dateString);
  return habit ?? null;
}

// TODO Fix this
export async function createHabit() {
  await fakeNetwork(``);

  const newHabitItem: Habit = {
    id: "1",
    name: "Read a book",
    description: "Read a book for 30 minutes",
    isDone: false,
    time: "00:00",
    createdAt: Date.now(),
  };

  const newHabitDate: HabitListByDate = {
    dateString: "2024-06-08",
    items: [newHabitItem],
  };

  const habits = await getHabits();
  const habitIndex = habits.findIndex(
    (habit) => habit.dateString === newHabitDate.dateString
  );

  if (habitIndex === -1) {
    const newHabits = [...habits, newHabitDate];
    await set(newHabits);
    return newHabitDate;
  } else {
    const newHabits = [...habits];
    newHabits[habitIndex].items.push(newHabitItem);
    await set(newHabits);
    return newHabitDate;
  }
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
