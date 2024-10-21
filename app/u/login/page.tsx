"use client";

import { loginSchema } from "@/app/models/UserSchema";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Eye, EyeClosed } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [tEye, setTEye] = useState(false);
  const router = useRouter();
  const handleToggle = () => setTEye((prev) => !prev);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<loginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: loginSchema) => {
      try {
        const res = await signIn("credentials", {
          redirect: false,
          email: data?.email,
          password: data?.password,
        });
        return res;
      } catch (error) {
        console.log(
          `Something went wrong. Login Failed please try again. ${error}`
        );
        throw new Error("Something went wrong. Login Failed");
      }
    },
    onSuccess: (result) => {
      if (result?.ok) {
        toast.success("Logged In");
        reset();
        router.push("/");
        Promise.resolve();
      } else {
        return toast.error(result?.error || "Login Failed");
      }
    },
    onError: (error) => {
      console.error("Unexpected Error", error);
      toast.error("An Unexpected Error Occured");
    },
  });

  const onSubmit: SubmitHandler<loginSchema> = async (data) => {
    try {
      mutate(data);
      reset();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Card className="w-full max-w-xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-center">
            {isLoading ? "Processing..." : "Login"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              {...register("email", { required: true })}
              placeholder="Email"
            />
            {errors?.email && (
              <span className="text-sm text-red-500 font-bold">
                {errors?.email?.message}
              </span>
            )}
            <div className="relative">
              <Input
                type={tEye ? "text" : "password"}
                {...register("password", { required: true })}
                placeholder="Password"
              />
              <Button
                onClick={handleToggle}
                type="button"
                variant={"ghost"}
                className="absolute top-0 right-0"
              >
                {tEye ? <Eye /> : <EyeClosed />}
              </Button>
              {errors?.password && (
                <span className="text-sm text-red-500 font-bold">
                  {errors?.password?.message}
                </span>
              )}
            </div>
            <Button disabled={isLoading} type="submit">
              Login
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex items-center justify-center">
          <p>
            Not an user ? <Link href="/u/signup">Sign Up</Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
