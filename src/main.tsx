import React from "react";
import ReactDOM from "react-dom/client";
import { RootRoute } from "@/routes/root";
import { ErrorRoute } from "@/routes/error";
import {
  HabitsRoute,
  loader as habitsLoader,
  action as habitsAction,
} from "@/routes/habits";
import { action as destroyAction } from "./routes/destroy";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootRoute />,
    errorElement: <ErrorRoute />,
    children: [
      {
        path: "/",
        element: <HabitsRoute />,
        loader: habitsLoader,
        action: habitsAction,
      },
      {
        path: "/:dateString",
        element: <HabitsRoute />,
        loader: habitsLoader,
        action: habitsAction,
      },
      {
        path: "/:dateString/:habitId/destroy",
        action: destroyAction,
      },
      // {
      //   path: "/:dateString",
      //   element: <HabitsRoute />,
      //   loader: habitsDateLoader,
      // },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
