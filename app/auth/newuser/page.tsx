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
import React from "react";

export default function NewUser() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center w-full">
      <Card className="w-full max-w-xl mx-auto shadow">
        <CardHeader>
          <CardTitle className="text-center">Sign Up</CardTitle>
          <CardDescription className="text-center">Welcome New User</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-2" action="">
            <Input type="text" placeholder="Enter User Name" />
            <Input type="email" placeholder="Enter Email" />
            <Input type="password" placeholder="Enter Password" />
            <Button className="w-full" type="submit">
              Sign Up
            </Button>
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
