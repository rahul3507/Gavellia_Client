/** @format */
"use client";
import React, { Suspense } from "react";
import ProductDetailsPage from "@/components/ProductDetailsPageComponents/ProductDetailsPage";

interface ProductDetailsProps {
  params: Promise<{
    title: string;
  }>;
}

const ProductDetails = ({ params }: ProductDetailsProps) => {
  return (
    <Suspense fallback={<div className="px-2 md:px-4 xl:px-6">Loading...</div>}>
      <ProductDetailsPage params={params} />
    </Suspense>
  );
};

export default ProductDetails;
