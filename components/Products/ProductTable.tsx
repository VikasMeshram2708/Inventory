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
  
  interface ProductType {
    index: number;
    title: string;
    description: string;
    category: string;
    amount: number;
  }
  
  const invoices: ProductType[] = [
    {
      index: 1,
      title: "Wireless Headphones",
      description:
        "High-quality wireless headphones with noise-canceling features.",
      category: "Electronics",
      amount: 99.99,
    },
    {
      index: 2,
      title: "Stainless Steel Water Bottle",
      description:
        "Durable 32oz water bottle with insulation to keep drinks cold or hot.",
      category: "Home & Kitchen",
      amount: 24.99,
    },
    {
      index: 3,
      title: "Yoga Mat",
      description: "Eco-friendly, non-slip yoga mat for all fitness levels.",
      category: "Sports & Outdoors",
      amount: 29.99,
    },
    {
      index: 4,
      title: "Bluetooth Speaker",
      description:
        "Portable Bluetooth speaker with excellent sound quality and long battery life.",
      category: "Electronics",
      amount: 45.0,
    },
    {
      index: 5,
      title: "Organic Green Tea",
      description:
        "Premium organic green tea with a refreshing taste and health benefits.",
      category: "Groceries",
      amount: 12.5,
    },
    {
      index: 6,
      title: "Leather Wallet",
      description:
        "Handmade leather wallet with multiple card slots and a coin pocket.",
      category: "Fashion",
      amount: 39.95,
    },
    {
      index: 7,
      title: "Electric Kettle",
      description:
        "Fast-boiling electric kettle with auto shut-off and stainless steel body.",
      category: "Home Appliances",
      amount: 34.99,
    },
    {
      index: 8,
      title: "Smartphone Stand",
      description: "Adjustable smartphone stand suitable for all phone sizes.",
      category: "Accessories",
      amount: 9.99,
    },
    {
      index: 9,
      title: "Running Shoes",
      description:
        "Lightweight and comfortable running shoes for daily exercise.",
      category: "Footwear",
      amount: 59.99,
    },
    {
      index: 10,
      title: "Aromatherapy Diffuser",
      description:
        "Ultrasonic aromatherapy diffuser with LED lights and timer settings.",
      category: "Health & Wellness",
      amount: 25.99,
    },
  ];
  
  export function ProductTable() {
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
          {invoices.map((invoice) => (
            <TableRow key={+invoice.index}>
              <TableCell className="font-medium">{invoice.index}</TableCell>
              <TableCell>{invoice.title}</TableCell>
              <TableCell>{invoice.description}</TableCell>
              <TableCell>{invoice.category}</TableCell>
              <TableCell className="text-right">{invoice.amount.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4} className="font-semibold">
              Total
            </TableCell>
            <TableCell className="text-right font-semibold">
              ${invoices.reduce((total, invoice) => total + invoice.amount, 0).toFixed(2)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    );
  }
  