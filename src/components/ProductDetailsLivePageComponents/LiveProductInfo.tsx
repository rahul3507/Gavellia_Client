"use client";

import React from "react";
import { Check, Eye, Package, Plane, Tag } from "lucide-react";
import Image from "next/image";
import { ProductData } from "@/types/allTypes";

interface LiveProductInfoProps {
  product: ProductData;
}

const conditionLabel = (c: string) => {
  switch (c) {
    case "new": return "New Condition";
    case "used": return "Used Condition";
    case "restored": return "Restored Condition";
    case "forparts": return "For Parts";
    default: return c;
  }
};

const locationLabel = (l: string) => {
  switch (l) {
    case "usa": return "Ship from USA";
    case "uk": return "Ship from UK";
    case "europe": return "Ship from Europe";
    default: return l;
  }
};

const LiveProductInfo = ({ product }: LiveProductInfoProps) => {
  return (
    <div className="space-y-4 w-full max-w-full overflow-hidden">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-primary/50 space-x-2 w-full min-w-0">
        <Package className="w-4 h-4 flex-shrink-0" />
        <span className="truncate">{product.category}</span>
        <span>/</span>
        <span className="truncate">{product.title.split(" ")[0]}</span>
      </div>

      {/* Product Title */}
      <h1 className="text-lg md:text-xl font-bold text-primary uppercase w-full break-words">
        {product.title}
      </h1>

      {/* Product Features */}
      <div className="space-y-2">
        {product.features.map((feature, i) => (
          <div key={i} className="flex items-center text-xs md:text-sm text-primary/50">
            <Check className="w-4 h-4 mr-2" />
            {feature}
          </div>
        ))}
      </div>

      {/* Product Info Tags */}
      <div className="grid grid-cols-3 gap-0 w-full min-w-0">
        <div className="flex flex-col space-y-1 text-primary bg-card-bg p-2 justify-center items-start min-w-0">
          <Tag className="w-4 h-4" />
          <span className="text-xs truncate w-full">{conditionLabel(product.condition)}</span>
        </div>
        <div className="flex flex-col space-y-1 text-primary bg-card-bg p-2 border-l-2 border-r-2 justify-center items-start min-w-0">
          <Eye className="w-4 h-4" />
          <span className="text-xs truncate w-full">{product.color || "Multi"}</span>
        </div>
        <div className="flex flex-col space-y-1 text-primary bg-card-bg p-2 justify-center items-start min-w-0">
          <Plane className="w-4 h-4" />
          <span className="text-xs truncate w-full">{locationLabel(product.location)}</span>
        </div>
      </div>

      {/* Timer */}
      <div className="flex items-center text-xs md:text-sm font-semibold text-primary/50">
        <span className="w-3 h-3 bg-red-500 rounded-full mr-2 animate-pulse"></span>
        {product.time} left
      </div>

      {/* Bid Information */}
      <div className="flex gap-4 w-full min-w-0 flex-wrap">
        <div className="flex-1 min-w-0">
          <span className="text-xs text-primary/50 block">Starting</span>
          <span className="text-sm font-medium text-primary truncate block">
            £{product.starting.toLocaleString()}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-xs text-primary/50 block">Bids</span>
          <span className="text-sm font-medium text-primary truncate block">
            {product.bids} bidder{product.bids !== 1 ? "s" : ""}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-xs text-primary/50 block">Highest bid</span>
          <span className="text-sm font-medium text-primary truncate block">
            £{product.highestBid.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-3 w-full max-w-full overflow-hidden">
        <h3 className="text-sm md:text-lg font-medium text-primary">Description</h3>
        <p className="text-primary/50 text-xs md:text-sm leading-relaxed break-words">
          {product.description}
        </p>
      </div>

      {/* Auction House Info */}
      <div className="w-full max-w-full overflow-hidden">
        <div className="flex items-center space-x-3 w-full min-w-0">
          <div className="w-14 h-14 bg-white rounded-lg flex items-center justify-center border flex-shrink-0">
            <Image
              src="/playstore.png"
              alt={product.auctionHouse}
              width={48}
              height={48}
              className="w-8 h-8"
            />
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="font-medium text-lg text-primary truncate">
              {product.auctionHouse}
            </h4>
            <p className="text-sm text-primary/50 truncate">
              {product.location === "usa"
                ? "New York, NY, United States"
                : product.location === "uk"
                ? "London, United Kingdom"
                : "Paris, France"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveProductInfo;
