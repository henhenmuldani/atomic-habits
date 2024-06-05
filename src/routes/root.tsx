import { ThemeProvider } from "@/components/theme-provider";
import { NavBar } from "@/components/nav-bar";
import { Outlet } from "react-router-dom";
export function RootRoute() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="max-w-2xl min-h-screen p-2 mx-auto">
        <NavBar />
        <main>
          <Outlet />
        </main>
      </div>
    </ThemeProvider>
  );
}
