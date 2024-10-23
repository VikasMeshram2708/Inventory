"use client";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import useDebounce from "@/lib/useDebounce";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { useFilterProductsMutation } from "@/app/store/product/productSlice";

export default function ProductSearch() {
  const [searchValue, setSearchValue] = useState("");
  const query = useDebounce(searchValue, 500);
  const [fProducts, setFProducts] = useState<Product[]>([]);

  // Use the mutation hook
  const [filteredProducts, { isError }] = useFilterProductsMutation();

  useEffect(() => {
    const queryProducts = async () => {
      if (query === "") {
        setFProducts([]);
        return;
      }

      try {
        // console.log("dq", { query });
        const res = await filteredProducts({ query }).unwrap(); // Unwrap to get data or throw error

        // Handle response
        setFProducts(res || []);
      } catch (error) {
        console.error(`Something went wrong. Please try again. ${error}`);
        setFProducts([]);
      }
    };

    // Only call queryProducts if query is not empty
    if (query) {
      queryProducts();
    }
  }, [query, filteredProducts]);

  const handleClear = () => {
    setSearchValue("");
    setFProducts([]);
  };

  return (
    <>
      <div className="flex items-center gap-3 justify-between">
        <div className="flex items-center gap-3 w-full">
          <p className="text-sm">Search Products:</p>
          <Input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="text-sm w-full max-w-2xl"
            placeholder="Search"
          />
        </div>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="highToLow">High to Low</SelectItem>
            <SelectItem value="minToHigh">Min to High</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {query.length >= 1 && isError && <p>Not Found</p>}

      {fProducts.length >= 1 && (
        <Button onClick={handleClear} variant={"destructive"}>
          Clear Results
        </Button>
      )}

      <ul className="grid gap-3 grid-cols-1 md:grid-cols-2 py-3">
        {fProducts.map((item) => (
          <FilteredProductsList
            key={item.id}
            title={item.title}
            description={item.description}
            amount={item.amount}
          />
        ))}
      </ul>
    </>
  );
}

interface filteredProductsProps {
  title: string;
  description: string;
  amount: number;
}

const FilteredProductsList = ({
  title,
  description,
  amount,
}: filteredProductsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="capitalize">{title}</CardTitle>
        <CardDescription className="capitalize">{description}</CardDescription>
      </CardHeader>
      <CardContent>{amount}</CardContent>
      <CardFooter>
        <Button variant={"destructive"}>Delete</Button>
      </CardFooter>
    </Card>
  );
};
