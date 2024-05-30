export type Habit = {
  id: string;
  name: string;
  description: string;
  isDone: boolean;
  startTime: Date;
  endTime: Date;
};

export const dataHabits: Habit[] = [
  {
    id: "1",
    name: "Sarapan",
    description: "Sarapan Bubur Ayam",
    isDone: false,
    startTime: new Date("2021-09-01T06:00:00.000Z"),
    endTime: new Date("2021-09-01T06:00:00.000Z"),
  },
  {
    id: "2",
    name: "Olahraga",
    description: "Lari Pagi",
    isDone: false,
    startTime: new Date("2021-09-01T06:00:00.000Z"),
    endTime: new Date("2021-09-01T06:00:00.000Z"),
  },
];