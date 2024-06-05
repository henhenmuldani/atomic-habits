import { Habit } from "../data/habits";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChangeEvent } from "react";
import { FaTrashCan, FaCheckDouble } from "react-icons/fa6";
import { TimePicker } from "@/components/ui/datetime-picker";
import { Time } from "@internationalized/date";
import { TimeValue } from "react-aria";

export function HabitItem({
  habit,
  updateHabit,
  deleteHabit,
  selectedDate,
  handleTimeChange,
  checkHabit,
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
  handleTimeChange: (
    date: string,
    newTime: TimeValue,
    id: string,
    key: keyof Habit
  ) => void;
  checkHabit: (id: string) => void;
}>) {
  // Split the time string into hours and minutes
  const convertStringToTimeValue = (timeString: string) => {
    const [hours, minutes] = timeString.split(":").map(Number);
    return { hours, minutes };
  };

  return (
    <Card key={habit.id} className="relative my-4">
      <div className="flex flex-row items-center">
        <Checkbox
          className="ml-4"
          onCheckedChange={() => checkHabit(habit.id)}
        />
        <div className="flex items-center justify-between w-full">
          <div className="w-full m-4 space-y-4">
            <Input
              className={`h-6 text-xl font-bold border-none ${
                habit.isDone ? "line-through" : ""
              }`}
              value={habit.name}
              onChange={(e) => {
                updateHabit(selectedDate, habit.id, "name", e);
              }}
              placeholder="Title"
            />
            <Input
              className={`h-6 border-none ${
                habit.isDone ? "line-through" : ""
              }`}
              value={habit.description}
              onChange={(e) =>
                updateHabit(selectedDate, habit.id, "description", e)
              }
              placeholder="Description"
            />
            <div className="flex space-x-5">
              <TimePicker
                aria-label="Time Picker"
                value={
                  new Time(
                    convertStringToTimeValue(habit.time).hours,
                    convertStringToTimeValue(habit.time).minutes
                  )
                }
                onChange={(newTime) =>
                  handleTimeChange(selectedDate, newTime, habit.id, "time")
                }
              />
              <Button
                className="mr-4"
                onClick={() => deleteHabit(habit.id)}
                variant={"destructive"}
              >
                <FaTrashCan />
              </Button>
            </div>
          </div>
        </div>
      </div>
      {
        // If the habit is done, display a checkmark
        habit.isDone && (
          <FaCheckDouble
            size={48}
            className="absolute top-0 right-0 text-xl text-green-500"
          />
        )
      }
    </Card>
  );
}
