/** @format */
"use client";
import { ProductData } from "@/types/allTypes";
import { Heart, CalendarDays } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface ProductCardProps {
  productData: ProductData;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  productData,
  className = "",
}) => {
  const [selectedBid, setSelectedBid] = useState<string>("");

  // Generate 5 bid options starting from highest bid + 10, incrementing by 10
  const generateBidOptions = () => {
    const startingBid = productData.highestBid + 10;
    return Array.from({ length: 5 }, (_, index) => startingBid + index * 10);
  };

  const bidOptions = generateBidOptions();

  // Generate URL-friendly title
  const urlTitle = productData.title.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className={`overflow-hidden  border-2 ${className}`}>
      <Link href={`/products/${urlTitle}`}>
        <div className="relative bg-card-bg h-[300px] cursor-pointer hover:opacity-90 transition-opacity">
          <Image
            src={productData.img[0]}
            alt={productData.title}
            className="w-full h-full object-cover"
            width={500}
            height={500}
          />
          <Heart className="absolute top-3 right-3 w-5 h-5 text-[#d9d9d9]" />
        </div>
      </Link>
      {/* Conditional rendering based on action type */}
      {productData.action === "timed" ? (
        <div className="p-4">
          <h3 className="text-sm font-bold text-slate-900 tracking-tight ">
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

          <div className="w-full flex justify-between space-x-2">
            <Select value={selectedBid} onValueChange={setSelectedBid}>
              <SelectTrigger className="text-sm h-9 min-w-16 border ">
                <SelectValue placeholder="£ Enter Amount" />
              </SelectTrigger>
              <SelectContent side="top">
                {bidOptions.map((bidAmount) => (
                  <SelectItem key={bidAmount} value={bidAmount.toString()}>
                    £{bidAmount}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button className="bg-primary hover:bg-primary/70 text-white text-sm h-9 px-3 rounded-none">
              REQUEST TO BID
            </Button>
          </div>
        </div>
      ) : (
        <div className="p-4 space-y-2">
          <div>
            {productData.action === "upcoming" && (
              <span className="text-xs font-medium px-1.5 py-0.5 rounded-xs bg-gray-100 text-slate-600">
                Upcoming
              </span>
            )}
            {productData.action === "live" && (
              <div className="flex text-sm w-20 font-medium pr-1 py-0.5 rounded-sm bg-red-500 text-white justify-center items-center mt-1">
                <div className="bg-white rounded-full h-1.5 w-1.5 mr-1"></div>
                Live now
              </div>
            )}
          </div>
          <h2 className="text-sm font-bold text-slate-900 tracking-tight">
            {productData.title.toUpperCase()}
          </h2>
          <div className="flex items-start gap-1 text-slate-700">
            <CalendarDays className="w-4 h-4  flex-shrink-0 text-slate-500" />
            <span className="text-xs">
              {productData.action === "upcoming"
                ? `Starts on ${productData.time}`
                : `Started ${productData.time} ago`}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
