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

export default function ProductSearch() {
  const [searchValue, setSearchValue] = useState("");
  const query = useDebounce(searchValue, 500);
  const [fProducts, setFProducts] = useState<Product[]>([]);

  useEffect(() => {
    const queryProducts = async () => {
      try {
        if (query === "") {
          setFProducts([]);
          return;
        }
        console.log("dq", { query: query });
        const res = await fetch("/api/p/search", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query: query.toLowerCase() }),
        });
        const result = await res.json();
        if (!res.ok) {
          throw result?.message || "Products Not Found";
        }
        console.log("res", result?.products || []);
        setFProducts(result?.products || []);
      } catch (error) {
        console.log(`Something went wrong. Please try again. ${error}`);
        setFProducts([]);
      }
    };
    queryProducts();
  }, [query]);

  const handleClear = () => {
    setSearchValue("")
    setFProducts([]);
  }

  return (
    <>
      <div className="flex items-center gap-3 justify-between">
        <div className="flex items-center gap-3 w-full">
          <p className="text-sm">Search Products : </p>
          <Input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="text-sm font-semibold w-full max-w-2xl"
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
      {fProducts.length > 1 && (
        <Button onClick={handleClear} variant={"destructive"}>Clear Results</Button>
      )}
      <ul className="grid gap-3 grid-cols-1 md:grid-cols-2 py-3">
        {fProducts?.map((item) => (
          <FilteredProductsList
            key={item?.id}
            title={item?.title}
            description={item?.description}
            amount={item?.amount}
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
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{amount}</CardContent>
      <CardFooter>
        <Button variant={"destructive"}>Delete</Button>
      </CardFooter>
    </Card>
  );
};
