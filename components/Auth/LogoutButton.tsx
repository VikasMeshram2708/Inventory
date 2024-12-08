"use client";

import { LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <Button onClick={() => signOut()} variant={"destructive"} type="submit">
      <span>
        <LogOut />
      </span>
      Logout
    </Button>
  );
}
