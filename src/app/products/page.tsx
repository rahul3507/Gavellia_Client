/** @format */
"use client";

import React, { Suspense } from "react";
import ProductsPage from "@/components/ProductsPageComponents/ProductsPage";

const Products = () => {
  return (
    <Suspense fallback={<div className="px-2 md:px-4 xl:px-6">Loading...</div>}>
      <ProductsPage />
    </Suspense>
  );
};

export default Products;
