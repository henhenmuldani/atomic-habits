import { Link } from "react-router-dom";
import { ModeToggle } from "@/components/mode-toggle";

export function NavBar() {
  return (
    <header>
      <nav className="flex items-center justify-between my-4">
        <Link to="/">
          <h1 className="text-xl font-bold">Atomic Habits</h1>
        </Link>
        <ModeToggle />
      </nav>
    </header>
  );
}
