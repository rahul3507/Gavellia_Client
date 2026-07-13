"use client";

import React from "react";
import Image from "next/image";

interface ProductDescriptionProps {
  description: string;
  auctionHouse: string;
  location: string;
}

const ProductDescription = ({
  description,
  auctionHouse,
  location,
}: ProductDescriptionProps) => {
  const locationCity = location === "usa"
    ? "New York, NY, United States"
    : location === "uk"
    ? "London, United Kingdom"
    : "Paris, France";

  return (
    <>
      {/* Description */}
      <div className="space-y-3">
        <h3 className="text-sm md:text-lg font-medium text-primary">Description</h3>
        <p className="text-primary/50 text-xs md:text-sm leading-relaxed">
          {description}
        </p>
      </div>

      {/* Auction House Info */}
      <div>
        <div className="flex items-center space-x-3">
          <div className="w-14 h-14 bg-white rounded-lg flex items-center justify-center border">
            <Image
              src="/playstore.png"
              alt={auctionHouse}
              width={48}
              height={48}
              className="w-8 h-8"
            />
          </div>
          <div>
            <h4 className="font-medium text-xl text-primary">
              {auctionHouse}
            </h4>
            <p className="text-sm text-primary/50">
              {locationCity}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDescription;
