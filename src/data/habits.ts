export type Habit = {
  id: string;
  name: string;
  description: string;
  isDone: boolean;
  startTime: string;
  endTime: string;
};

export type HabitList = {
  [date: string]: Habit[];
};

export const dataHabits: HabitList = {
  "2024-05-31": [
    {
      id: "1",
      name: "Olahraga",
      description: "lari di gasibu",
      isDone: false,
      startTime: "07:00",
      endTime: "08:00",
    },
    {
      id: "2",
      name: "Sarapan",
      description: "makan lotek",
      isDone: false,
      startTime: "08:00",
      endTime: "09:00",
    },
  ],
};
