/** @format */

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const HomePage = () => {
  return (
    <div className="px-2 md:px-4 xl:px-6">
      {/* this is top banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Art Auction */}
        <div className="relative bg-card-bg  overflow-hidden h-80 md:h-[455px]  col-span-1 md:col-span-1">
          <div className="absolute inset-0">
            <Image
              src="/ArtBanner.jpg"
              alt="Art Banner"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#79764f]/80 to-transparent">
            <div className="p-4 md:p-6 h-full flex flex-col justify-between">
              <div>
                <h2 className="text-white text-base md:text-lg font-semibold mb-2">
                  OWN A PIECE OF HISTORY
                </h2>
                <p className="text-white/90 text-xs md:text-sm">
                  Bid on authenticated artworks – from Renaissance masters to
                  emerging contemporary artists
                </p>
              </div>
              <Link
                href="#"
                className="text-primary bg-transparent hover:text-primary/70 hover:underline text-xs md:text-sm  self-start"
              >
                EXPLORE ART AUCTION
              </Link>
            </div>
          </div>
        </div>

        {/* Watch Collection */}
        <div className="flex flex-col justify-between bg-card-bg p-4 md:p-6 h-80 md:h-[455px] col-span-1 md:col-span-2">
          {/* Text Section */}
          <div className="text-center">
            <h2 className="text-primary text-base md:text-lg font-semibold mb-2">
              TIMELESS INVESTMENTS
            </h2>
            <p className="text-primary/80 text-xs md:text-sm">
              Rolex, Patek Philippe & rare vintage pieces
            </p>
          </div>

          {/* Image Section */}
          <div className="flex justify-center items-center flex-1">
            <div className="relative w-64 h-48 md:w-[900px] md:h-80">
              <Image
                src="/WatchBanner.png"
                alt="Luxury watch"
                fill
                className="w-full h-full object-contain"
                priority
              />
            </div>
          </div>

          {/* Button Section */}
          <div className="text-center">
            <Link
              href="#"
              className="text-primary font-semibold hover:text-primary/70 hover:underline text-xs md:text-sm underline"
            >
              VIEW WATCH COLLECTION
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
