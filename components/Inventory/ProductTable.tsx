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
// import { Input } from "../ui/input";
// import { fetchProducts } from "@/actions/inventory";

import { fetchProducts } from "@/actions/inventory";
import { Input } from "../ui/input";

export default async function ProductTable() {
  const products = await fetchProducts();
  console.log('p',products)

  function calculateTotalAmount(data: ProductType[] | undefined): number {
    if (!data || data.length === 0) return 0;

    return data.reduce(
      (total, product) => total + +product.amount,
      0
    );
  }

  const totalAmount = calculateTotalAmount(products?.data);

  return (
    <div className="w-full max-w-7xl grid gap-3 mx-auto py-10">
      <div className="container mx-auto flex items-center gap-2">
        <label htmlFor="Search Product">Search </label>
        <Input placeholder="Search Product..." type="text" />
      </div>
      <Table className="border p-2">
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
          {products?.data?.map((invoice, index) => (
            <TableRow key={invoice.id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
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
            <TableCell className="text-right">&#8377;{totalAmount}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
