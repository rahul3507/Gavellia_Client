/** @format */
"use client";

import ProductCard from "@/components/common/ProductCard";
import ArtAuctionCard from "@/components/HomeComponents/ArtAuctionCard";
import AutomotiveHeroCard from "@/components/HomeComponents/AutomotiveHeroCard";
import BottomCTACard from "@/components/HomeComponents/BottomCTACard";
import WatchCollectionCard from "@/components/HomeComponents/WatchCollectionCard";
import Link from "next/link";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchProducts } from "@/redux/feature/productsSlice";

const HomePage = () => {
  const dispatch = useAppDispatch();
  const { products, loading } = useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts({ page: 1, limit: 5 }));
  }, [dispatch]);

  return (
    <div className="px-2 md:px-4 xl:px-6 mb-12">
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
          {loading
            ? Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 h-[300px] rounded" />
                  <div className="p-4 space-y-2">
                    <div className="bg-gray-200 h-4 rounded w-3/4" />
                    <div className="bg-gray-200 h-3 rounded w-1/2" />
                  </div>
                </div>
              ))
            : products.slice(0, 5).map((productItem, index) => {
                let visibilityClass = "";

                if (index === 0) {
                  visibilityClass = "";
                } else if (index === 1) {
                  visibilityClass = "hidden sm:block";
                } else if (index === 2) {
                  visibilityClass = "hidden md:block";
                } else if (index === 3) {
                  visibilityClass = "hidden xl:block";
                } else if (index === 4) {
                  visibilityClass = "hidden 2xl:block";
                }

                return (
                  <ProductCard
                    key={productItem.id}
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
