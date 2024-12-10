// SkeletonLoader.tsx
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

export default function loading() {
  return (
    <div className="w-full max-w-7xl grid gap-3 mx-auto py-10">
      <div className="w-container mx-auto flex items-center gap-2">
        <Skeleton className="h-8 w-1/4 rounded" />
      </div>
      <Table className="border p-2 container mx-auto">
        <TableCaption>
          <Skeleton className="h-6 w-1/3 rounded" />
        </TableCaption>

        <TableBody>
          {[...Array(5)].map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <Skeleton className="h-4 w-[50px] rounded" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-[200px] rounded" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-[300px] rounded" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-[100px] rounded" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-[100px] rounded" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>Total</TableCell>
            <TableCell className="text-right">
              &#8377;
              <Skeleton className="h-4 w-[100px] rounded" />
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
