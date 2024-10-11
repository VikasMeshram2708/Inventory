"use client";

import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { Button } from "./ui/button";
import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import { LogOut } from "lucide-react";

export default function Navbar() {
  const { status } = useSession();
  useEffect(() => {}, [status]);

  const handleLogout = async () => signOut();
  return (
    <header className="">
      <nav className="py-2 border-b max-w-5xl mx-auto flex items-center justify-between">
        <h1 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold">
          <Link href="/">Inventory</Link>
        </h1>
        <div className="flex items-center gap-3">
          {status === "loading" ? (
            <span>Loading...</span>
          ) : status === "authenticated" ? (
            <Button onClick={handleLogout} className="flex gap-1 items-center" variant={"destructive"}>
              <span>
                <LogOut />
              </span>
              <span>Logout</span>
            </Button>
          ) : (
            <Button className="font-bold">
              <Link href="/u/signup">Login / Sign Up</Link>
            </Button>
          )}
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
}
