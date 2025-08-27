/** @format */

import Image from "next/image";
import Link from "next/link";
import React from "react";

const AutomotiveHeroCard = () => {
  return (
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
            className="text-white hover:text-white/80 text-xs md:text-sm mb-4 underline"
          >
            FULLY INSPECTED COLLECTOR CARS
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AutomotiveHeroCard;
