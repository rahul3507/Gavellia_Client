/** @format */
"use client";

import React from "react";
import Image from "next/image";
import { Clock } from "lucide-react";
import Link from "next/link";

interface BidProduct {
  id: number;
  title: string;
  image: string;
  timeLeft: string;
  startingPrice: number;
  bids: number;
  highestBid: number;
}

const demoBidProducts: BidProduct[] = Array.from({ length: 4 }, (_, i) => ({
  id: i + 1,
  title: "Bowling SS Bag",
  image: "/productImage/Bowling_SS_Bag.png",
  timeLeft: "00d:12h:29 sec left",
  startingPrice: 48,
  bids: 18,
  highestBid: 370,
}));

const InspiredByBids = () => {
  return (
    <div className="mt-8 sm:mt-10">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-2xl sm:text-3xl font-bold text-primary font-serif italic">
          Inspired by your Bids
        </h2>
        <Link
          href="/products"
          className="text-xs sm:text-sm font-semibold text-primary hover:underline uppercase tracking-wide"
        >
          VIEW ALL
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {demoBidProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition"
          >
            {/* Image */}
            <div className="relative aspect-square bg-gray-50 flex items-center justify-center overflow-hidden">
              <Image
                src={product.image}
                alt={product.title}
                width={300}
                height={300}
                className="object-cover w-full h-full hover:scale-105 transition-transform"
              />
            </div>

            {/* Info */}
            <div className="p-3 sm:p-4">
              <h3 className="text-sm font-bold text-primary uppercase">
                {product.title}
              </h3>
              <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                <Clock className="w-3 h-3" />
                {product.timeLeft}
              </div>

              <div className="grid grid-cols-3 gap-2 mt-3 text-xs">
                <div>
                  <p className="text-muted-foreground">Starting</p>
                  <p className="font-semibold text-primary">
                    £{product.startingPrice}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Bids</p>
                  <p className="font-semibold text-primary">
                    {product.bids} bidder
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Highest bid</p>
                  <p className="font-semibold text-primary">
                    £{product.highestBid}
                  </p>
                </div>
              </div>

              <button className="mt-3 w-full bg-primary text-white text-xs font-semibold py-2 rounded-md hover:bg-primary/90 transition">
                BID
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InspiredByBids;
