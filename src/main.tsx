import React from "react";
import ReactDOM from "react-dom/client";
import { RootRoute } from "@/routes/root";
import { ErrorRoute } from "@/routes/error";
import { HabitsRoute } from "@/routes/habits";
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
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
