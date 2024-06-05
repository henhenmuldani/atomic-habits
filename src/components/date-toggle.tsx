import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { Button } from "./ui/button";
import dayjs from "dayjs";

export function DateToggle({
  addDay,
  selectedDate,
}: Readonly<{
  addDay: (days: number) => void;
  selectedDate: string;
}>) {
  const currentDateLocale = dayjs(selectedDate).format("dddd, DD MMM YYYY");

  return (
    <div className="flex items-center justify-between w-full px-2 py-2 rounded">
      <Button onClick={() => addDay(-1)} className="p-2 rounded">
        <FaAngleLeft />
      </Button>
      <h1 className="text-lg font-medium">{currentDateLocale}</h1>
      <Button onClick={() => addDay(+1)} className="p-2 rounded ">
        <FaAngleRight />
      </Button>
    </div>
  );
}
