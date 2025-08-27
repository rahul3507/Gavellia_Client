/** @format */

import Image from "next/image";
import Link from "next/link";
import React from "react";

const WatchCollectionCard = () => {
  return (
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
  );
};

export default WatchCollectionCard;
