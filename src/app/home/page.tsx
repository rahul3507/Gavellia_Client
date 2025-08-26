/** @format */

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const HomePage = () => {
  return (
    <div className="px-2 md:px-4 xl:px-6">
      {/* this is top banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2">
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

      {/* Automotive Hero */}
      <div className="relative bg-card-bg  overflow-hidden h-96 md:h-[455px] mb-8">
        <div className="absolute inset-0">
          <Image
            src="/AutomationBanner.jpg"
            alt="Classic vintage car"
            fill
            className="w-full h-full object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#040d08]/80 to-transparent">
          <div className="absolute bottom-6 left-0 right-0 flex flex-col items-center text-center">
            <h2 className="text-white text-base md:text-lg font-semibold mb-2">
              ICONIC AUTOMOTIVE LEGENDS
            </h2>
            <Link
              href="#"
              className="text-white/90 text-xs md:text-sm mb-4 underline"
            >
              FULLY INSPECTED COLLECTOR CARS
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom CTA Section */}
      <div className="relative bg-[#1c1c1c] rounded-lg overflow-hidden h-64">
        <div className="absolute inset-0 flex">
          <div className="w-1/2 p-8 flex flex-col justify-center">
            <h2 className="text-white text-3xl font-serif mb-4">
              Find Highly Sought After With Lower Price
            </h2>
            <p className="text-white/80 text-sm mb-6">
              Browse thousands of live auction ancient materials
            </p>
            <button className="text-white text-sm underline self-start">
              PARTICIPATE LIVE AUCTION
            </button>
          </div>
          <div className="w-1/2 grid grid-cols-2 gap-2 p-4">
            <Image
              src="/luxury-leather-handbag-brown-designer.png"
              alt="Luxury handbag"
              width={300}
              height={300}
              className="w-full h-full object-cover rounded"
            />
            <Image
              src="/gold-jewelry-necklace-luxury.png"
              alt="Gold jewelry"
              width={300}
              height={300}
              className="w-full h-full object-cover rounded"
            />
            <Image
              src="/vintage-leather-wallet-accessories.png"
              alt="Leather accessories"
              width={300}
              height={300}
              className="w-full h-full object-cover rounded"
            />
            <Image
              src="/luxury-sunglasses-designer-accessories.png"
              alt="Designer sunglasses"
              width={300}
              height={300}
              className="w-full h-full object-cover rounded"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
