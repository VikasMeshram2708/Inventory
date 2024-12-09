"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import ProductModal from "./ProductModal";

export default function AddProduct() {
  const [toggle, setToggle] = useState(false);

  return (
    <div className="w-full">
      <div className="container max-w-7xl mx-auto">
        <Button className="float-end" type="button" onClick={() => setToggle((prev) => !prev)}>
          Add
        </Button>
      </div>

      {toggle && <ProductModal setToggle={setToggle} />}
    </div>
  );
}
