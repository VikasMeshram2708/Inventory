"use client";

import { signUp } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { useFormStatus } from "react-dom";

export default function NewUser() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center w-full">
      <Card className="w-full max-w-xl mx-auto shadow">
        <CardHeader>
          <CardTitle className="text-center">Sign Up</CardTitle>
          <CardDescription className="text-center">
            Welcome New User
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            action={async (formData: FormData) => {
              const result = await signUp(formData);
              if ("error" in result) {
                console.log("err", result.error);
                alert(result.error);
              } else {
                console.log("ms", result.message);
                alert(result.message);
                redirect("/auth/signin");
              }
            }}
            className="grid gap-2"
          >
            <Input type="text" name="username" placeholder="Enter User Name" />
            <Input type="email" name="email" placeholder="Enter Email" />
            <Input
              type="password"
              name="password"
              placeholder="Enter Password"
            />
            <SignUpButton />
          </form>
        </CardContent>
        <CardFooter className="flex items-center justify-center">
          <p>
            Already an User ? <Link href="/auth/signin">Sign In</Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

function SignUpButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      disabled={pending}
      className={`${pending ? "cursor-not-allowed" : "cursor-pointer"} w-full`}
      type="submit"
    >
      {pending ? "Processing..." : "Sign Up"}
    </Button>
  );
}
