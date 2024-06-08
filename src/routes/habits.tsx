import {
  Form,
  LoaderFunctionArgs,
  useLoaderData,
  useNavigate,
  useParams,
} from "react-router-dom";
import { createHabit, getHabitsByDate } from "@/storage/habit";
import { DateToggle } from "@/components/date-toggle";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { HabitItem } from "@/components/habit-item";

// eslint-disable-next-line react-refresh/only-export-components
export async function loader({ params }: LoaderFunctionArgs) {
  const dateString = params.dateString
    ? String(params.dateString)
    : dayjs().format("YYYY-MM-DD");
  const habitsByDate = await getHabitsByDate(dateString);

  return { habitsByDate };
}

// eslint-disable-next-line react-refresh/only-export-components
export async function action({ params }: LoaderFunctionArgs) {
  const dateString = params.dateString;

  const habits = await createHabit(dateString ?? dayjs().format("YYYY-MM-DD"));
  return { habits };
}

export function HabitsRoute() {
  const { habitsByDate } = useLoaderData() as Awaited<
    ReturnType<typeof loader>
  >;
  const navigate = useNavigate();
  const params = useParams<{ dateString: string }>();

  const [selectedDate, setSelectedDate] = useState(() => {
    return params.dateString ?? dayjs().format("YYYY-MM-DD");
  });

  useEffect(() => {
    if (!params.dateString) {
      const currentDate = dayjs().format("YYYY-MM-DD");
      setSelectedDate(currentDate);
      navigate(`/${currentDate}`, { replace: true });
    }
  }, [params.dateString, navigate]);

  // function to add days to the selected date
  const addDay = (days: number) => {
    const newDate = dayjs(selectedDate).add(days, "day").format("YYYY-MM-DD");
    setSelectedDate(newDate);
    navigate(`/${newDate}`);
  };

  return (
    <div>
      <main>
        <DateToggle addDay={addDay} selectedDate={selectedDate} />
        {habitsByDate?.items.map((habit) => (
          <HabitItem key={habit.id} habit={habit} />
        ))}
        <Form method="post">
          <Button>Add</Button>
        </Form>
        <pre>{JSON.stringify(habitsByDate, null, 2)}</pre>
      </main>
    </div>
  );
}
