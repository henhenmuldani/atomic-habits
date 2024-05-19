export type Habit = {
  id: number;
  name: string;
  description: string;
  done: boolean;
  startTime: string;
  endTime: string;
};

export const dataHabits: Habit[] = [
  {
    id: 1,
    name: "Sarapan",
    description: "Sarapan Bubur Ayam",
    done: false,
    startTime: "06:00",
    endTime: "06:30",
  },
  {
    id: 2,
    name: "Olahraga",
    description: "Lari Pagi",
    done: false,
    startTime: "06:30",
    endTime: "07:00",
  },
  {
    id: 3,
    name: "Mandi",
    description: "Mandi Pagi",
    done: false,
    startTime: "07:00",
    endTime: "07:30",
  },
];
