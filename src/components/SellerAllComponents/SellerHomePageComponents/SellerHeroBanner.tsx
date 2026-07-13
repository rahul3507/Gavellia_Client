"use client";

import React from "react";
import { Check } from "lucide-react";
import Image from "next/image";

const SellerHeroBanner = () => {
  return (
    <div className="grid-cols-1 relative">
      <Image
        src="/Seller-home-banner.jpg"
        alt="Woman with curly hair holding packages and phone"
        className="w-full h-full object-cover"
        width={800}
        height={800}
      />

      {/* Success Notification Overlay */}
      <div className="absolute top-1/2 left-24 bg-white/20 backdrop-blur-md border border-white/30 shadow-lg p-4 flex items-center space-x-3 max-w-xs rounded-lg">
        <div className="w-8 h-8 bg-[#4caf50] rounded-full flex items-center justify-center">
          <Check className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="text-primary/50 font-medium text-sm md:text-base">
            Your item sold
          </p>
          <p className="text-primary font-semibold">£8.99</p>
        </div>
      </div>
    </div>
  );
};

export default SellerHeroBanner;
