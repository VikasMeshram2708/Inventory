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

export function ProductTable() {
  const { data, isLoading } = useFetchAllQuery();
  const [sProduct, setSProducts] = useState<Product[]>([]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSProducts(data || []);
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
  const totalAmount = data
    ?.reduce((total, invoice) => total + invoice.amount, 0)
    .toFixed(2);

  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>
            <Input
              className="w-5 h-5"
              type="checkbox"
              checked={data?.length === sProduct.length}
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
          : data?.map((invoice, index) => (
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
                <TableCell className="font-medium">{index + 1}</TableCell>
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
  );
}
