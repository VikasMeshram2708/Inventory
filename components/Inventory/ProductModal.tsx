"use client";

import { Dispatch, SetStateAction } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { X } from "lucide-react";
import { addProduct } from "@/actions/inventory";
import { useFormStatus } from "react-dom";

export default function ProductModal({
  setToggle,
}: {
  setToggle: Dispatch<SetStateAction<boolean>>;
}) {
  async function handleProduct(formData: FormData) {
    const result = await addProduct(formData);
    if ("error" in result) {
      // console.log("er", result.error);
      alert(result.error);
    } else {
      // console.log("ms", result.message);
      alert(result.message);
      setToggle(false);
    }
  }
  return (
    <div className="absolute w-full z-40 bg-black/90 h-screen top-0 py-20">
      <Card className="container max-w-xl mx-auto shadow-primary/50 shadow">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="container flex flex-col gap-2 items-center justify-center">
              <CardTitle>New Product</CardTitle>
              <CardDescription>
                Enter product details, features, and pricing to showcase your
                item.
              </CardDescription>
            </div>
            <Button
              type="button"
              className="hover:text-red-500"
              onClick={() => setToggle(false)}
              variant={"ghost"}
            >
              <X />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form className="grid gap-2" action={handleProduct}>
            <Input name="title" type="text" placeholder="Type Title" required />
            <Input
              name="description"
              type="text"
              placeholder="Type Description"
              required
            />
            <Input
              name="amount"
              type="number"
              step={0.01}
              placeholder="Type Price"
              required
            />
            <Input
              name="quantity"
              type="number"
              placeholder="Type Quantity"
              required
            />
            <SubmitButton />
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      disabled={pending}
      className={`${pending ? "cursor-not-allowed" : "cursor-pointer"}`}
      type="submit"
    >
      {pending ? "Processing..." : "Add"}
    </Button>
  );
}
