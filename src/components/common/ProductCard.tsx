/** @format */

import { ProductData } from "@/types/allTypes";
import { Heart } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";

interface ProductCardProps {
  productData: ProductData;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  productData,
  className = "",
}) => {
  return (
    <div className={`overflow-hidden min-h-[490px] border-2 ${className}`}>
      <div className="relative bg-card-bg h-[300px]">
        <Image
          src={productData.img}
          alt={productData.title}
          className="w-full h-full object-cover"
          width={500}
          height={500}
        />
        <Heart className="absolute top-3 right-3 w-5 h-5 text-[#d9d9d9]" />
      </div>
      <div className="p-4">
        <h3 className="font-medium text-primary mb-1 text-sm ">
          {productData.title.toUpperCase()}
        </h3>
        <div className="flex items-center text-sm  text-primary mb-2">
          <span className="w-2 h-2 bg-[#ff4646] rounded-full mr-2"></span>
          {productData.time} left
        </div>
        <div className="flex gap-5 items-center text-sm mb-3">
          <div className="flex flex-col">
            <span className="text-tertiary">Current</span>
            <span className="font-semibold">£{productData.starting}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-tertiary">Bids</span>
            <span className="font-semibold">{productData.bids}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-tertiary">Highest bid</span>
            <span className="font-semibold">£{productData.highestBid}</span>
          </div>
        </div>

        <div className="w-full flex justify-between  space-x-2">
          <input
            placeholder="£ Enter Amount"
            className="text-sm h-9 min-w-16"
          />
          <Button className="bg-primary hover:bg-primary/70 text-white text-sm h-9 px-3 rounded-none">
            REQUEST TO BID
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
