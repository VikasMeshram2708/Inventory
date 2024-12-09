"use client";

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
import { signIn } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

export default function SignIn() {
  return (
    <div className="min-h-screen flex flex-col justify-center w-full items-center">
      <Card className="w-full max-w-xl shadow mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Sign In</CardTitle>
          <CardDescription className="text-center">
            Welcome Back
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="grid gap-2"
            action={async (formData: FormData) => {
              const result = await signIn("credentials", {
                redirect: false,
                email: formData.get("email"),
                password: formData.get("password"),
              });

              // console.log("re", result);

              if (result?.error) {
                // console.log("er", result?.error);
                return alert(result.error);
              } else {
                // console.log("mg", result);
                alert("Logged In");
                redirect("/");
              }
            }}
          >
            <Input name="email" type="email" placeholder="Enter Email" />
            <Input
              name="password"
              type="password"
              placeholder="Enter Password"
            />
            <Button className="w-full max-w-5xl mx-auto" type="submit">
              Sign In
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex items-center justify-center">
          <p>
            Not an User ? <Link href="/auth/newuser">New User</Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
