import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { ModeToggle } from "./ModeToggle";

export default function Navbar() {
  return (
    <header className="border-b p-3">
      <nav className="flex items-center justify-between container max-w-7xl mx-auto">
        <h1 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold">
          <Link href="/">Inventory</Link>
        </h1>
        <div className="space-x-2">
          <Button type="button">
            <Link href="/auth/login">Login / Sign Up</Link>
          </Button>
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
}
