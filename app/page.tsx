import AddProduct from "@/components/Inventory/AddProduct";
import ProductTable from "@/components/Inventory/ProductTable";

export default function Home() {
  return (
    <div className="min-h-screen w-full py-10">
      <div className="grid gap-5">
        <AddProduct />
        <ProductTable />
      </div>
    </div>
  );
}
