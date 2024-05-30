import { Button } from "./components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useState, ChangeEvent, useEffect } from "react";
import { type Habit, dataHabits } from "./data/habits";

export function App() {
  const [habits, setHabits] = useState<Habit[]>(dataHabits);

  const handleAddHabit = () => {
    const newHabit: Habit = {
      id: crypto.randomUUID(),
      name: "",
      description: "",
      isDone: false,
      startTime: new Date(),
      endTime: new Date(),
    };

    setHabits([...habits, newHabit]);
  };

  const handleInputChangeHabit = (
    id: string,
    key: keyof Habit,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const newHabits = habits.map((habit) => {
      if (habit.id === id) {
        return { ...habit, [key]: e.target.value };
      }
      return habit;
    });

    setHabits(newHabits);
  };

  useEffect(() => {
    console.log(habits);
  }, [habits]);

  const handleDeleteHabit = (id: string) => {
    const newHabits = habits.filter((habit) => habit.id !== id);
    setHabits(newHabits);
  };

  return (
    <div className="min-h-screen bg-gray-200">
      <main className="max-w-2xl p-2 mx-auto space-y-2">
        <h1>Atomic Habits</h1>

        {habits.map((habit) => (
          <Card key={habit.id}>
            <div className="flex flex-row items-center p-4">
              <Checkbox className="ml-4" />
              <div className="flex items-center justify-between w-full">
                <div className="w-full p-4 space-y-1">
                  <Input
                    className="border-none"
                    value={habit.name}
                    onChange={(e) =>
                      handleInputChangeHabit(habit.id, "name", e)
                    }
                    placeholder="Title"
                  />
                  <Input
                    className="border-none "
                    value={habit.description}
                    onChange={(e) =>
                      handleInputChangeHabit(habit.id, "description", e)
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
        <Button onClick={handleAddHabit}>Add</Button>
      </main>
    </div>
  );
}
