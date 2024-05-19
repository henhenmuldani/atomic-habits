import { useState, FormEvent } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import dayjs from "dayjs";
import "dayjs/locale/id"; // import locale
import { dataHabits } from "./data/habits";
import { HabitItem } from "./components/ui/habit-item";
import { Habit } from "../src/data/habits";

export function App() {
  const [currentDate, setCurrentDate] = useState(dayjs().locale("id"));
  const [inputHabit, setInputHabit] = useState<{
    habit: Habit;
  }>({
    habit: {
      id: 0,
      name: "",
      description: "",
      done: false,
      startTime: "",
      endTime: "",
    },
  });

  const changeDate = (days: number) => {
    setCurrentDate((currentDate) => currentDate.add(days, "day"));
  };

  const addHabit = (event: FormEvent) => {
    event.preventDefault();

    const newHabit = {
      id: dataHabits.length + 1,
      name: inputHabit.habit.name,
      description: inputHabit.habit.description,
      done: false,
      startTime: "",
      endTime: "",
    };

    dataHabits.push(newHabit);

    setInputHabit({
      habit: {
        id: 0,
        name: "",
        description: "",
        done: false,
        startTime: "",
        endTime: "",
      },
    });
  };

  return (
    <div className="min-h-screen bg-slate-200">
      <main className="max-w-2xl p-2 mx-auto space-y-2">
        <h1 className="text-3xl font-bold underline">Atomic Habits</h1>
        <form action="" onSubmit={addHabit} className="p-4 bg-white rounded-lg">
          <h1 className="text-xl font-bold text-center">Form Habit</h1>
          <div className="mb-2">
            <label htmlFor="name" className="block mb-2 text-sm font-bold">
              Habit Name
            </label>
            <input
              required
              type="text"
              id="name"
              name="name"
              value={inputHabit.habit.name}
              onChange={(event) =>
                setInputHabit({
                  habit: {
                    ...inputHabit.habit,
                    name: event.target.value,
                  },
                })
              }
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-bold"
            >
              Habit Description
            </label>
            <input
              required
              type="text"
              id="description"
              name="description"
              value={inputHabit.habit.description}
              onChange={(event) =>
                setInputHabit({
                  habit: {
                    ...inputHabit.habit,
                    description: event.target.value,
                  },
                })
              }
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            />
          </div>
          <button
            type="submit"
            className="w-full p-3 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-800"
          >
            Submit
          </button>
        </form>
        <div className="flex items-center justify-between w-full px-2 py-2 bg-gray-100 rounded">
          <button
            onClick={() => changeDate(-1)}
            className="p-2 bg-white rounded hover:bg-slate-200"
          >
            <FaAngleLeft />
          </button>
          <h1>{currentDate.format("dddd, DD MMM YYYY")}</h1>
          <button
            onClick={() => changeDate(1)}
            className="p-2 bg-white rounded hover:bg-slate-200"
          >
            <FaAngleRight />
          </button>
        </div>
        <ul>
          {dataHabits.map((habit) => (
            <li key={habit.id}>
              <HabitItem habit={habit} />
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
