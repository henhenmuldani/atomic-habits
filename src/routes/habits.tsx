import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { HabitItem } from "@/components/habit-item";
import { useState, ChangeEvent, useEffect } from "react";
import { type HabitList, type Habit, dataHabits } from "@/data/habits";
import { DateToggle } from "@/components/date-toggle";
import dayjs from "dayjs";
import "dayjs/locale/id"; // import locale
import { TimeValue } from "react-aria";

export function HabitsRoute() {
  const [habits, setHabits] = useState<HabitList>(dataHabits);
  const [selectedDate, setSelectedDate] = useState("");

  // function to add days to the selected date
  const addDay = (days: number) => {
    setSelectedDate(dayjs(selectedDate).add(days, "day").format("YYYY-MM-DD"));
  };

  // function to add a new habit to the selected date
  const addHabit = (date: string) => {
    const newHabit: Habit = {
      id: crypto.randomUUID(),
      name: "",
      description: "",
      isDone: false,
      time: "00:00",
    };

    setHabits((prevHabits) => {
      const dateHabits = prevHabits[date] || [];
      return {
        ...prevHabits,
        [date]: [...dateHabits, newHabit],
      };
    });
  };

  // filter the habits based on the selected date
  const filteredHabitsByDate = selectedDate ? habits[selectedDate] || [] : [];

  // function to change the habit value
  const updateHabit = (
    date: string,
    id: string,
    key: keyof Habit,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setHabits((prevHabits) => {
      const dateHabits = prevHabits[date] || [];
      const updatedHabits = dateHabits.map((habit) =>
        habit.id === id ? { ...habit, [key]: e.target.value } : habit
      );
      return {
        ...prevHabits,
        [date]: updatedHabits,
      };
    });
  };

  // function to delete a habit
  const deleteHabit = (id: string) => {
    console.log("Delete habit with id", id);
    const newHabits = Object.fromEntries(
      Object.entries(habits).map(([date, dateHabits]) => [
        date,
        dateHabits.filter((habit) => habit.id !== id),
      ])
    );
    console.log(newHabits);
    setHabits(newHabits);
  };

  useEffect(() => {
    setSelectedDate(selectedDate || dayjs().format("YYYY-MM-DD"));
    console.log(habits);
  }, [habits, selectedDate]);

  const handleTimeChange = (
    date: string,
    newTime: TimeValue,
    id: string,
    key: keyof Habit
  ) => {
    // Convert TimeValue to a formatted string (HH:MM)
    const hours = newTime.hour.toString().padStart(2, "0");
    const minutes = newTime.minute.toString().padStart(2, "0");
    const formattedTime = `${hours}:${minutes}`;
    console.log(formattedTime);

    setHabits((prevHabits) => {
      const dateHabits = prevHabits[date] || [];
      const updatedHabits = dateHabits.map((habit) =>
        habit.id === id ? { ...habit, [key]: formattedTime } : habit
      );
      console.log(updatedHabits);
      return {
        ...prevHabits,
        [date]: updatedHabits,
      };
    });
  };

  const checkHabit = (id: string) => {
    console.log("Check habit with id", id);
    setHabits((prevHabits) => {
      const updatedHabits = Object.fromEntries(
        Object.entries(prevHabits).map(([date, dateHabits]) => [
          date,
          dateHabits.map((habit) =>
            habit.id === id ? { ...habit, isDone: !habit.isDone } : habit
          ),
        ])
      );
      return updatedHabits;
    });
  };

  return (
    <div>
      <main>
        {selectedDate && (
          <div>
            <DateToggle addDay={addDay} selectedDate={selectedDate} />
            {filteredHabitsByDate.length > 0 ? (
              <div>
                {filteredHabitsByDate.map((habit) => (
                  <div key={habit.id}>
                    <HabitItem
                      key={habit.id}
                      habit={habit}
                      updateHabit={updateHabit}
                      deleteHabit={deleteHabit}
                      selectedDate={selectedDate}
                      handleTimeChange={handleTimeChange}
                      checkHabit={checkHabit}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <Card className="my-4">
                <CardHeader className="items-center justify-center">
                  <CardTitle>No habits on this date</CardTitle>
                </CardHeader>
              </Card>
            )}
          </div>
        )}

        <Button onClick={() => addHabit(selectedDate)}>Add</Button>
      </main>
    </div>
  );
}
