import AddProduct from "@/components/Inventory/AddProduct";
import ProductTable from "@/components/Inventory/ProductTable";

export interface PageProps {
  searchParams?: {
    page: string | number;
    limit: string | number;
  };
}
export default function Home(props: PageProps) {
  return (
    <div className="min-h-screen w-full py-10">
      <div className="grid gap-5">
        <AddProduct />
        <ProductTable {...props} />
      </div>
    </div>
  );
}
