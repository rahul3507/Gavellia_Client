"use client";

import React from "react";

const ProductDetailsSkeleton = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center py-20">
      <div className="animate-pulse space-y-4 w-full max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-200 h-96 rounded-lg" />
          <div className="space-y-4">
            <div className="bg-gray-200 h-8 rounded w-3/4" />
            <div className="bg-gray-200 h-4 rounded w-1/2" />
            <div className="bg-gray-200 h-4 rounded w-2/3" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsSkeleton;
