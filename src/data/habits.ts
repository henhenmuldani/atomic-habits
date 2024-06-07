export type Habit = {
  id: string;
  name: string;
  description: string;
  isDone: boolean;
  time: string;
  createdAt?: number;
};

export type HabitListByDate = {
  dateString: string;
  items: Habit[];
};
