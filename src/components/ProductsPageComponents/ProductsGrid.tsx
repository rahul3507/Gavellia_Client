"use client";

import React from "react";
import ProductCard from "@/components/common/ProductCard";
import { Button } from "@/components/ui/button";
import { ProductData } from "@/types/allTypes";

interface ProductsGridProps {
  products: ProductData[];
  loading: boolean;
  onClearFilters: () => void;
}

const ProductsGrid = ({ products, loading, onClearFilters }: ProductsGridProps) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-8">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 h-[300px] rounded" />
            <div className="p-4 space-y-2">
              <div className="bg-gray-200 h-4 rounded w-3/4" />
              <div className="bg-gray-200 h-3 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500 text-lg">No products found matching your filters.</p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={onClearFilters}
        >
          Clear Filters
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-8">
      {products.map((productItem) => (
        <ProductCard key={productItem.id} productData={productItem} />
      ))}
    </div>
  );
};

export default ProductsGrid;
