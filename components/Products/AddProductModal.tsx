import { X } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Dispatch, SetStateAction } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProductSchema } from "@/app/models/ProductSchema";
import toast from "react-hot-toast";
import { useAddNewProductMutation } from "@/app/store/product/productSlice";

interface AddProductModalProps {
  setTAddModal: Dispatch<SetStateAction<boolean>>;
}
export default function AddProductModal({
  setTAddModal,
}: AddProductModalProps) {
  const handleToogle = () => {
    setTAddModal((prev) => !prev);
  };

  const {
    register,
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<createProductSchema>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      title: "",
      amount: 0,
      category: "",
      description: "",
    },
  });

  const [newProduct, { isLoading, error }] = useAddNewProductMutation({});
  const onSubmit: SubmitHandler<createProductSchema> = async (data) => {
    try {
      // console.log("d", data);
      const res = await newProduct(data);
      if (error) {
        return toast.error(res?.error as string);
      }
      toast.success(res?.data?.message as string);
      reset();
      handleToogle();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-background z-40 min-h-screen w-full flex flex-col items-center justify-center">
      <Button
        onClick={handleToogle}
        className="absolute right-10 top-10"
        variant={"destructive"}
      >
        <X />
      </Button>
      <Card className="w-full max-w-xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold">
            {isLoading ? "Processing..." : "Add Product"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <Input
              {...register("title", { required: true })}
              placeholder="Title"
            />
            {errors?.title && (
              <span className="text-sm text-red-500 font-bold">
                {errors?.title?.message}
              </span>
            )}
            <Input
              {...register("description", { required: true })}
              placeholder="Description"
            />
            {errors?.description && (
              <span className="text-sm text-red-500 font-bold">
                {errors?.description?.message}
              </span>
            )}
            <Input
              type="number"
              {...register("amount", { required: true, valueAsNumber: true })}
              placeholder="Amount"
            />
            {errors?.amount && (
              <span className="text-sm text-red-500 font-bold">
                {errors?.amount?.message}
              </span>
            )}
            <div className="flex items-center justify-between">
              <Button disabled={isLoading} type="submit">
                Add
              </Button>
              <Controller
                name="category"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="fashion">Fashion</SelectItem>
                      <SelectItem value="books">Books</SelectItem>
                      <SelectItem value="furniture">Furniture</SelectItem>
                      <SelectItem value="food">Food</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.category && (
                <span className="text-sm text-red-500 font-bold">
                  {errors.category.message}
                </span>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
