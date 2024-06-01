import { Habit } from "../data/habits";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChangeEvent } from "react";
import { FaTrashCan } from "react-icons/fa6";

export function HabitItem({
  habit,
  updateHabit,
  deleteHabit,
  selectedDate,
}: Readonly<{
  habit: Habit;
  updateHabit: (
    date: string,
    id: string,
    key: keyof Habit,
    e: ChangeEvent<HTMLInputElement>
  ) => void;
  deleteHabit: (id: string) => void;
  selectedDate: string;
}>) {
  return (
    <Card key={habit.id} className="my-2">
      <div className="flex flex-row items-center">
        <Checkbox className="ml-4" />
        <div className="flex items-center justify-between w-full">
          <div className="w-full m-4 space-y-4">
            <Input
              className="h-6 text-xl font-bold border-none"
              value={habit.name}
              onChange={(e) => {
                updateHabit(selectedDate, habit.id, "name", e);
              }}
              placeholder="Title"
            />
            <Input
              className="h-6 border-none"
              value={habit.description}
              onChange={(e) =>
                updateHabit(selectedDate, habit.id, "description", e)
              }
              placeholder="Description"
            />
          </div>
          <Button
            className="mr-4"
            onClick={() => deleteHabit(habit.id)}
            variant={"destructive"}
          >
            <FaTrashCan />
          </Button>
        </div>
      </div>
    </Card>
  );
}
