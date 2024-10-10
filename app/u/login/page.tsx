"use client";

import { loginSchema } from "@/app/models/UserSchema";
import { useLoginUserMutation } from "@/app/store/user/userSlice";
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

  const [loginUser, { error }] = useLoginUserMutation({});
  const onSubmit: SubmitHandler<loginSchema> = async (data) => {
    try {
      // console.log("data", data);
      const res = await loginUser(data);
      // console.log('res', res)
      if (error || !res) {
        return toast.error(res?.error as string);
      }
      return toast.success(res?.data as string);
      reset();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Card className="w-full max-w-xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-center">
            Login
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
            <Button type="submit">Login</Button>
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
