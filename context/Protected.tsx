"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Protected({ children }: { children: React.ReactNode }) {
  const session = useSession();
  if (!session) {
    redirect("/auth/signin");
  }
  return <>{children}</>;
}
