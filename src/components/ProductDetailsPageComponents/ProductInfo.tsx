"use client";

import React from "react";
import { Check, Eye, Package, Plane, Tag } from "lucide-react";

interface ProductInfoProps {
  category: string;
  title: string;
  features: string[];
  condition: string;
  color: string;
  location: string;
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

const ProductInfo = ({
  category,
  title,
  features,
  condition,
  color,
  location,
}: ProductInfoProps) => {
  return (
    <div className="space-y-4 md:space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-primary/50 space-x-2">
        <Package className="w-4 h-4" />
        <span>{category}</span>
        <span>/</span>
        <span>{title.split(" ")[0]}</span>
      </div>

      {/* Product Title */}
      <h1 className="text-xl md:text-3xl xl:text-4xl font-bold text-primary uppercase">
        {title}
      </h1>

      {/* Product Features */}
      <div className="space-y-2">
        {features.map((feature, i) => (
          <div key={i} className="flex items-center text-xs md:text-sm text-primary/50">
            <Check className="w-4 h-4 mr-2" />
            {feature}
          </div>
        ))}
      </div>

      {/* Product Info Tags */}
      <div className="grid grid-cols-3">
        <div className="flex flex-col space-y-2 text-primary bg-card-bg p-2 md:p-5 justify-center items-start">
          <Tag className="w-4 h-4" />
          <span className="text-xs md:text-sm">{conditionLabel(condition)}</span>
        </div>
        <div className="flex flex-col space-y-2 text-primary bg-card-bg p-2 md:p-5 border-l-2 border-r-2 justify-center items-start">
          <Eye className="w-4 h-4" />
          <span className="text-xs md:text-sm">{color || "Multi"}</span>
        </div>
        <div className="flex flex-col space-y-2 text-primary bg-card-bg p-2 md:p-5 justify-center items-start">
          <Plane className="w-4 h-4" />
          <span className="text-xs md:text-sm">{locationLabel(location)}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
