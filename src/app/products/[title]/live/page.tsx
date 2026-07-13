/** @format */
"use client";
import React, { Suspense } from "react";
import ProductDetailsLivePage from "@/components/ProductDetailsLivePageComponents/ProductDetailsLivePage";

interface ProductLiveProps {
  params: Promise<{
    title: string;
  }>;
}

const ProductLive = ({ params }: ProductLiveProps) => {
  return (
    <Suspense fallback={<div className="px-2 md:px-4 xl:px-6">Loading...</div>}>
      <ProductDetailsLivePage params={params} />
    </Suspense>
  );
};

export default ProductLive;
