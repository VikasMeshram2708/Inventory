import ProductSearch from "@/components/ProductSearch";
import { ProductTable } from "@/components/ProductTable";

export default function Home() {
  return (
    <main className="min-h-screen w-full max-w-5xl mx-auto py-10">
      <div>
        <ProductSearch />
      </div>
      <div className="py-10">
        <ProductTable />
      </div>
    </main>
  );
}
