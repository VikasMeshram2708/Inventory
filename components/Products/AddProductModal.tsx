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

interface AddProductModalProps {
  setTAddModal: Dispatch<SetStateAction<boolean>>;
}
export default function AddProductModal({
  setTAddModal,
}: AddProductModalProps) {
  const handleToogle = () => {
    setTAddModal((prev) => !prev);
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
            Add Product
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form action="" className="space-y-3">
            <Input placeholder="Title" />
            <Input placeholder="Description" />
            <Input placeholder="Amount" />
            <div className="flex items-center justify-between">
              <Button>Add</Button>

              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="highToLow">Electronics</SelectItem>
                  <SelectItem value="minToHigh">Fashion</SelectItem>
                  <SelectItem value="minToHigh">Books</SelectItem>
                  <SelectItem value="minToHigh">Furniture</SelectItem>
                  <SelectItem value="minToHigh">Food</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
