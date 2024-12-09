"use client";

import ProductModal from "@/components/Inventory/ProductModal";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Home() {
  const [toggle, setToggle] = useState(false);
  return (
    <div className="relative min-h-screen w-full">
      <div className="container mx-auto  max-w-7xl">
        <h1>Hello,World!</h1>
        <Button onClick={() => setToggle((prev) => !prev)} type="button">
          Add Product
        </Button>
      </div>
      {toggle && <ProductModal setToggle={setToggle} />}
    </div>
  );
}
