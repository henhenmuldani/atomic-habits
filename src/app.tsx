import { Button } from "./components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useState, ChangeEvent, useEffect } from "react";
import { type HabitList, type Habit, dataHabits } from "./data/habits";

export function App() {
  const [habits, setHabits] = useState<HabitList>(dataHabits);
  const [selectedDate, setSelectedDate] = useState<string>("");

  const handleAddHabit = (date: string) => {
    const newHabit: Habit = {
      id: crypto.randomUUID(),
      name: "",
      description: "",
      isDone: false,
      startTime: new Date(),
      endTime: new Date(),
    };

    setHabits((prevHabits) => {
      const dateHabits = prevHabits[date] || [];
      return {
        ...prevHabits,
        [date]: [...dateHabits, newHabit],
      };
    });
  };

  const addHabitForToday = () => {
    const today = new Date().toISOString().split("T")[0];
    handleAddHabit(today);
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  const filteredHabits = selectedDate ? habits[selectedDate] || [] : [];

  const handleInputChangeHabit = (
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

  const handleDeleteHabit = (id: string) => {
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
    setSelectedDate("2024-05-31");
    console.log(habits);
  }, [habits]);

  return (
    <div className="min-h-screen bg-gray-200">
      <main className="max-w-2xl p-2 mx-auto space-y-2">
        <h1>Atomic Habits</h1>
        <div>
          <label>
            Filter by date:
            <input
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
            />
          </label>

          {selectedDate && (
            <div>
              <h2>{selectedDate}</h2>
              {filteredHabits.length > 0 ? (
                <div>
                  {filteredHabits.map((habit) => (
                    <Card key={habit.id}>
                      <div className="flex flex-row items-center p-4">
                        <Checkbox className="ml-4" />
                        <div className="flex items-center justify-between w-full">
                          <div className="w-full p-4 space-y-1">
                            <Input
                              className="border-none"
                              value={habit.name}
                              onChange={(e) => {
                                handleInputChangeHabit(
                                  selectedDate,
                                  habit.id,
                                  "name",
                                  e
                                );
                              }}
                              placeholder="Title"
                            />
                            <Input
                              className="border-none "
                              value={habit.description}
                              onChange={(e) =>
                                handleInputChangeHabit(
                                  selectedDate,
                                  habit.id,
                                  "description",
                                  e
                                )
                              }
                              placeholder="Description"
                            />
                          </div>
                          <Button
                            onClick={() => handleDeleteHabit(habit.id)}
                            variant={"destructive"}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <p>No habits for this date.</p>
              )}
            </div>
          )}
        </div>

        <Button onClick={addHabitForToday}>Add</Button>
      </main>
    </div>
  );
}
