import { LoaderFunctionArgs, redirect } from "react-router-dom";
import { deleteItemHabit } from "@/storage/habit";

export async function action({ params }: LoaderFunctionArgs) {
  console.log({ params });
  const { dateString, habitId } = params;
  await deleteItemHabit(String(dateString), String(habitId));

  return redirect("/");
}
