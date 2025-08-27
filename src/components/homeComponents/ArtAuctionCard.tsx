/** @format */

import Image from "next/image";
import Link from "next/link";
import React from "react";

const ArtAuctionCard = () => {
  return (
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
            className="text-primary  bg-transparent hover:text-primary/70 hover:underline text-xs md:text-sm  self-start"
          >
            EXPLORE ART AUCTION
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ArtAuctionCard;
