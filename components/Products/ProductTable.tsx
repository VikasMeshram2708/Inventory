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
import { useEffect } from "react";
import { Skeleton } from "../ui/skeleton";

export function ProductTable() {
  const { data, isLoading } = useFetchAllQuery();

  useEffect(() => {
  }, [data]);
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Index</TableHead>
          <TableHead className="w-[150px]">Title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Category</TableHead>
          <TableHead className="text-right">Amount ($)</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading &&
          // Render skeletons while loading
          Array.from({ length: 5 }).map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <Skeleton className="h-4 w-16" />
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
          ))}
        {data?.map((invoice, index) => (
          <TableRow key={+invoice.id}>
            <TableCell className="font-medium">{index + 1}</TableCell>
            <TableCell>{invoice.title}</TableCell>
            <TableCell>{invoice.description}</TableCell>
            <TableCell>{invoice.category}</TableCell>
            <TableCell className="text-right">
              {invoice.amount.toFixed(2)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={4} className="font-semibold">
            Total
          </TableCell>
          <TableCell className="text-right font-semibold">
            $
            {data
              ?.reduce((total, invoice) => total + invoice.amount, 0)
              .toFixed(2)}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
