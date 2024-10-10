"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import AddProductModal from "./AddProductModal";

export default function AddProduct() {
  const [tAddModal, setTAddModal] = useState(false);
  return (
    <div className="">
      <Button onClick={() => setTAddModal((prev) => !prev)}>Add Product</Button>
      {tAddModal && <AddProductModal setTAddModal={setTAddModal} />}
    </div>
  );
}
