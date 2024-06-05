export type Habit = {
  id: string;
  name: string;
  description: string;
  isDone: boolean;
  time: string;
  createdAt?: number;
};

export type HabitList = {
  [date: string]: Habit[];
};

export const dataHabits: HabitList = {
  "2024-06-05": [
    {
      id: "1",
      name: "Olahraga",
      description: "lari di gasibu",
      isDone: false,
      time: "07:00",
    },
    {
      id: "2",
      name: "Sarapan",
      description: "makan lotek",
      isDone: false,
      time: "08:00",
    },
  ],
};
