/** @format */

import ProductCard from "@/components/common/ProductCard";
import ArtAuctionCard from "@/components/homeComponents/ArtAuctionCard";
import AutomotiveHeroCard from "@/components/homeComponents/AutomotiveHeroCard";
import BottomCTACard from "@/components/homeComponents/BottomCTACard";
import WatchCollectionCard from "@/components/homeComponents/WatchCollectionCard";
import { product } from "@/data/productData";
import Link from "next/link";
import React from "react";

const HomePage = () => {
  return (
    <div className="px-2 md:px-4 xl:px-6">
      {/* this is top banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2">
        {/* Art Auction */}
        <ArtAuctionCard />

        {/* Watch Collection */}
        <WatchCollectionCard />
      </div>

      {/* Automotive Hero */}
      <AutomotiveHeroCard />

      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <div></div>
          <Link
            href="/products"
            className="text-primary hover:text-primary/70 text-xs md:text-sm underline cursor-pointer "
          >
            SHOW ALL
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-1">
          {product.slice(0, 5).map((productItem, index) => {
            let visibilityClass = "";

            if (index === 0) {
              // Always show first product
              visibilityClass = "";
            } else if (index === 1) {
              // Show second product from sm breakpoint
              visibilityClass = "hidden sm:block";
            } else if (index === 2) {
              // Show third product from md breakpoint
              visibilityClass = "hidden md:block";
            } else if (index === 3) {
              // Show fourth product from lg breakpoint
              visibilityClass = "hidden xl:block";
            } else if (index === 4) {
              // Show fifth product from 2xl breakpoint
              visibilityClass = "hidden 2xl:block";
            }

            return (
              <ProductCard
                key={index}
                productData={productItem}
                className={visibilityClass}
              />
            );
          })}
        </div>
      </div>

      {/* Bottom CTA Section */}
      <BottomCTACard />
    </div>
  );
};

export default HomePage;
