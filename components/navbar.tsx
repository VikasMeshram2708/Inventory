import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { ModeToggle } from "./ModeToggle";
import { getServerSession } from "next-auth";
import LogoutButton from "./Auth/LogoutButton";
import { authOptions } from "@/utils/nextAuthOptions";

export default async function Navbar() {
  const session = await getServerSession(authOptions);
  return (
    <header className="shadow-lg border-b p-3">
      <nav className="flex items-center justify-between container max-w-7xl mx-auto">
        <h1 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold">
          <Link href="/">Inventory</Link>
        </h1>
        {/* <p>{JSON.stringify(session)}</p> */}
        <div className="flex gap-2">
          {session ? (
            <>
              <LogoutButton />
            </>
          ) : (
            <Button type="button">
              <Link href="/auth/login">Login / Sign Up</Link>
            </Button>
          )}
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
}
