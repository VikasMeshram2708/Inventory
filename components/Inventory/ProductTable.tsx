/* eslint-disable prefer-const */
"use client";

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

import { fetchProducts } from "@/actions/inventory";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useCallback, useEffect, useState } from "react";
import TableLoader from "../TableLoader";

export default function ProductTable() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    limit: 5,
  });

  const fetchAllProduct = useCallback(async () => {
    try {
      setLoading(true);
      const result = await fetchProducts(
        pagination.currentPage,
        pagination.limit
      );
      if ("error" in result) {
        console.log("res", result.error);
        return alert(result.error);
      }
      console.log("r", result.data);
      setProducts(result.data);
      setTotalPages(result.totalCount);
    } catch (error) {
      console.error(`Something went wrong. Please try again.${error}`);
    } finally {
      setLoading(false);
    }
  }, [pagination]);

  useEffect(() => {
    if (pagination.currentPage !== totalPages && pagination.currentPage >= 1) {
      fetchAllProduct();
    }
  }, [fetchAllProduct, pagination, totalPages]);

  // Prev Pagination Button
  function handlePrev(page: number) {
    if (page === 0 || page === 1) return;
    let currentIndexPage = page - 1;
    setPagination({
      currentPage: currentIndexPage,
      limit: 5,
    });
  }

  // Next Pagination Button
  function handleNext(page: number) {
    let currentNextPage = page + 1;
    setPagination({
      currentPage: currentNextPage,
      limit: 5,
    });
  }

  // console.log("p", products.data);

  function calculateTotalAmount(data: ProductType[] | undefined): number {
    if (!data || data.length === 0) return 0;

    return data.reduce(
      (total, product) => total + parseFloat(product.amount),
      0
    );
  }

  const totalAmount = calculateTotalAmount(products);

  if (loading) {
    return <TableLoader />;
  }

  return (
    <div className="w-full max-w-7xl grid gap-3 mx-auto py-10">
      <div className="container mx-auto flex items-center gap-2">
        <label htmlFor="Search Product">Search </label>
        <Input placeholder="Search Product..." type="text" />
      </div>
      <Table className="border p-2 container mx-auto">
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Index</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products?.map((invoice, index) => (
            <TableRow key={invoice.id}>
              <TableCell className="font-medium">
                {(pagination.currentPage - 1) * pagination.limit + index + 1}
              </TableCell>
              <TableCell>{invoice.title}</TableCell>
              <TableCell>{invoice.description}</TableCell>
              <TableCell>{invoice.quantity}</TableCell>
              <TableCell className="text-right">{invoice.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>Total</TableCell>
            <TableCell className="text-right">
              &#8377;{totalAmount.toFixed(2)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <div className="container flex justify-end gap-2">
        <Button
          disabled={pagination.currentPage === 1}
          onClick={() => handlePrev(pagination.currentPage)}
          type="button"
          className={`${
            pagination.currentPage === 1
              ? "cursor-not-allowed"
              : "cursor-pointer"
          }`}
        >
          Prev
        </Button>
        <Button
          disabled={pagination.currentPage === totalPages}
          onClick={() => handleNext(pagination.currentPage)}
          type="button"
          className={`${
            pagination.currentPage === totalPages
              ? "cursor-not-allowed"
              : "cursor-pointer"
          }`}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
