import { ModeToggle } from "@/components/mode-toggle";

export function NavBar() {
  return (
    <header>
      <nav className="flex items-center justify-between">
        <h1>Atomic Habits</h1>
        <ModeToggle />
      </nav>
    </header>
  );
}
