import AddProduct from "@/components/Products/AddProduct";
import ProductSearch from "@/components/Products/ProductSearch";
import { ProductTable } from "@/components/Products/ProductTable";

export default function Home() {
  return (
    <main className="min-h-screen w-full max-w-5xl mx-auto py-10 px-4 flex flex-col gap-10">
      <div>
        <ProductSearch />
      </div>
      <div>
        <AddProduct />
      </div>
      <div>
        <ProductTable />
      </div>
    </main>
  );
}
