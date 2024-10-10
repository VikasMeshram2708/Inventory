"use client";

import { signUpSchema } from "@/app/models/UserSchema";
import { useCreateNewUserMutation } from "@/app/store/user/userSlice";
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
import { Eye, EyeClosed } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function SignUpPage() {
  const [tEye, setTEye] = useState(false);
  const router = useRouter();
  const handleToggle = () => setTEye((prev) => !prev);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<signUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const [newUser, { isLoading, data: error }] = useCreateNewUserMutation({});
  const onSubmit: SubmitHandler<signUpSchema> = async (data) => {
    try {
      const res = await newUser(data);
      // console.log("res", res?.data);
      // console.log("rm", resMsg);
      // console.log("iserr", isError);
      if (error) {
        return toast.error(res?.error as string);
      }
      toast.success(res?.data as string);
      reset();
      router.push("/u/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Card className="w-full max-w-xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-center">
            {isLoading ? "Processing..." : "Sign Up"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              {...register("username", { required: true })}
              placeholder="User Name"
            />
            {errors?.username && (
              <span className="text-sm text-red-500 font-bold">
                {errors?.username?.message}
              </span>
            )}
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
              Sign Up
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex items-center justify-center">
          <p>
            ALready a user ? <Link href="/u/login">Login</Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
