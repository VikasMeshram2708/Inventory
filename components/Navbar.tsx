import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <header className="">
      <nav className="py-2 border-b max-w-5xl mx-auto flex items-center justify-between">
        <h1 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold">
          <Link href="/">Inventory</Link>
        </h1>
        <div className="space-x-4">
          <Button className="font-bold">
            <Link href="/u/signup">Login / Sign Up</Link>
          </Button>
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
}
