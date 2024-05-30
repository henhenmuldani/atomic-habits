import { Habit } from "../data/habits";

export function HabitItem({ habit }: { habit: Habit }) {
  return (
    <div className="p-4 mb-3 bg-white rounded shadow-sm">
      <h1 className="font-bold">{habit.name}</h1>
      <p>{habit.description}</p>
    </div>
  );
}
