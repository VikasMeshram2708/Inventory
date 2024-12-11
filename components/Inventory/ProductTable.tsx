/* eslint-disable prefer-const */
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
import PaginationButton from "./PaginationButton";
import { PageProps } from "@/app/page";
import SearchBar from "./SearchBar";

export default async function ProductTable(props: PageProps) {
  const page = (await props.searchParams?.page) || 1;
  const limit = (await props?.searchParams?.limit) || 5;

  const { data: products, metadata: _metaData } = await fetchProducts({
    currPage: +page,
    limit: +limit,
  });

  let metaData = {
    page: +page,
    limit: +limit,
    hasNextPage: _metaData?.hasNextPage,
    totalPage: _metaData?.totalPages,
  };

  function calculateTotalAmount(data: ProductType[] | undefined): number {
    if (!data || data.length === 0) return 0;

    return data.reduce(
      (total, product) => total + parseFloat(product.amount),
      0
    );
  }

  const totalAmount = calculateTotalAmount(products);
  return (
    <div className="w-full max-w-7xl grid gap-3 mx-auto py-10">
      <SearchBar />
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
                {(metaData.page - 1) * metaData.limit + index + 1}
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
      <PaginationButton {...JSON.parse(JSON.stringify(metaData))} />
    </div>
  );
}
