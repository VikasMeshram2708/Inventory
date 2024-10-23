/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useFetchAllQuery } from "@/app/store/product/productSlice";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export function ProductTable() {
  const [cSkip, setCSkip] = useState(0);
  const [cLimit, setCLimit] = useState(10);

  const { data, isLoading } = useFetchAllQuery({ skip: cSkip, limit: cLimit });
  const [sProduct, setSProducts] = useState<Product[]>([]);

  // next
  const handleNext = () => {
    setCSkip((prev) => prev + cLimit);
  };

  const handlePrev = () => {
    setCSkip((prev) => Math.max(prev - cLimit, 0));
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSProducts(data?.products || []);
    } else {
      setSProducts([]);
    }
  };

  const handleProductSelect = (product: Product, checked: boolean) => {
    setSProducts((prev) =>
      checked ? [...prev, product] : prev.filter((p) => p.id !== product.id)
    );
  };

  // Calculate total amount
  const totalAmount = data?.products
    ?.reduce((total, invoice) => total + invoice.amount, 0)
    .toFixed(2);

  return (
    <section className="py-10">
      <div className="flex items-center justify-end gap-1 py-5">
        <Button
          type="button"
          onClick={handlePrev}
          disabled={cSkip === 0}
          variant={"destructive"}
          className="cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
        >
          Prev
        </Button>
        <Button
          className="cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
          type="button"
          disabled={!data?.hasMore}
          onClick={handleNext}
        >
          Next
        </Button>
      </div>
      <Table className="shadow-lg shadow-gray-200">
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Input
                className="w-5 h-5"
                type="checkbox"
                checked={data?.products?.length === sProduct.length}
                onChange={(e) => handleSelectAll(e.target.checked)}
                aria-label="Select all products"
              />
            </TableHead>
            <TableHead className="w-[100px]">Index</TableHead>
            <TableHead className="w-[150px]">Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Amount ($)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading
            ? // Render skeletons while loading
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton className="h-4 w-5" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-40" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-60" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-32" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-20" />
                  </TableCell>
                </TableRow>
              ))
            : data?.products?.map((invoice, index) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">
                    <Input
                      checked={sProduct.includes(invoice)}
                      onChange={(e) =>
                        handleProductSelect(invoice, e.target.checked)
                      }
                      type="checkbox"
                      className="w-5 h-5"
                      aria-label={`Select ${invoice.title}`}
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    {cSkip + index + 1}
                  </TableCell>
                  <TableCell className="capitalize">{invoice.title}</TableCell>
                  <TableCell className="capitalize">
                    {invoice.description}
                  </TableCell>
                  <TableCell>{invoice.category}</TableCell>
                  <TableCell className="text-right">
                    {invoice.amount.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={5} className="font-semibold">
              Total
            </TableCell>
            <TableCell className="text-right font-semibold">
              ${totalAmount}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </section>
  );
}
