/** @format */

import ArtAuctionCard from "@/components/homeComponents/ArtAuctionCard";
import AutomotiveHeroCard from "@/components/homeComponents/AutomotiveHeroCard";
import BottomCTACard from "@/components/homeComponents/BottomCTACard";
import WatchCollectionCard from "@/components/homeComponents/WatchCollectionCard";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import Image from "next/image";
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
            href="#"
            className="text-primary hover:text-primary/70 text-xs md:text-sm underline cursor-pointer "
          >
            SHOW ALL
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Leather Jacket */}
          <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-[#e9e9e9]">
            <div className="relative">
              <img
                src="/vintage-black-leather-motorcycle-jacket.png"
                alt="Vintage leather jacket"
                className="w-full h-48 object-cover"
              />
              <Heart className="absolute top-3 right-3 w-5 h-5 text-[#d9d9d9]" />
            </div>
            <div className="p-4">
              <h3 className="font-medium text-[#1c1c1c] mb-1">
                VINTAGE LEATHER JACKET
              </h3>
              <div className="flex items-center text-xs text-[#79764f] mb-2">
                <span className="w-2 h-2 bg-[#ff4646] rounded-full mr-2"></span>
                01d:05h:42 sec left
              </div>
              <div className="flex justify-between items-center text-sm mb-3">
                <span className="text-[#1c1c1c]">Current</span>
                <span className="text-[#1c1c1c]">Highest bid</span>
              </div>
              <div className="flex justify-between items-center mb-3">
                <span className="font-semibold">£75</span>
                <span className="text-[#1c1c1c]">23 bidder</span>
                <span className="font-semibold">£220</span>
              </div>
              <div className="flex space-x-2">
                <input placeholder="Enter Amount" className="text-xs h-8" />
                <Button className="bg-[#343330] hover:bg-[#1c1c1c] text-white text-xs h-8 px-3">
                  REQUEST TO BID
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA Section */}
      <BottomCTACard />
    </div>
  );
};

export default HomePage;
