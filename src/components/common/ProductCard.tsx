/** @format */

import { ProductData } from "@/types/allTypes";
import { Heart } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";

interface ProductCardProps {
  productData: ProductData;
}

const ProductCard: React.FC<ProductCardProps> = ({ productData }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-[#e9e9e9]">
      <div className="relative">
        <Image
          src={productData.img}
          alt={productData.title}
          className="w-full h-48 object-cover"
          width={500}
          height={500}
        />
        <Heart className="absolute top-3 right-3 w-5 h-5 text-[#d9d9d9]" />
      </div>
      <div className="p-4">
        <h3 className="font-medium text-[#1c1c1c] mb-1">
          {productData.title.toUpperCase()}
        </h3>
        <div className="flex items-center text-xs text-[#79764f] mb-2">
          <span className="w-2 h-2 bg-[#ff4646] rounded-full mr-2"></span>
          {productData.time} left
        </div>
        <div className="flex justify-between items-center text-sm mb-3">
          <span className="text-[#1c1c1c]">Current</span>
          <span className="text-[#1c1c1c]">Highest bid</span>
        </div>
        <div className="flex justify-between items-center mb-3">
          <span className="font-semibold">£{productData.starting}</span>
          <span className="text-[#1c1c1c]">{productData.bids} bidder</span>
          <span className="font-semibold">£{productData.highestBid}</span>
        </div>
        <div className="flex space-x-2">
          <input placeholder="Enter Amount" className="text-xs h-8" />
          <Button className="bg-[#343330] hover:bg-[#1c1c1c] text-white text-xs h-8 px-3">
            REQUEST TO BID
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
