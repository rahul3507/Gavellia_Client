"use client";

import React from "react";
import ProductCard from "@/components/common/ProductCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ProductData } from "@/types/allTypes";

interface RelatedProductsProps {
  products: ProductData[];
}

const RelatedProducts = ({ products }: RelatedProductsProps) => {
  if (products.length === 0) return null;

  return (
    <div className="mt-0 md:mt-8 px-4 md:px-8 lg:px-12">
      <h2 className="text-sm text-primary mb-2">You Might Interest</h2>

      <div className="relative">
        <Carousel
          opts={{
            align: "start",
            loop: false,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4 mb-12">
            {products.map((productItem, index) => (
              <CarouselItem
                key={index}
                className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
              >
                <ProductCard productData={productItem} />
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="absolute mr-[-32px] bottom-3 right-0 transform -translate-x-1/2 flex items-center space-x-4">
            <CarouselPrevious className="static translate-y-0 translate-x-0 bg-white/80 hover:bg-white border-0 shadow-md" />
            <CarouselNext className="static translate-y-0 translate-x-0 bg-white/80 hover:bg-white border-0 shadow-md" />
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default RelatedProducts;
