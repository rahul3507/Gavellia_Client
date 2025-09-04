/** @format */

import { Check } from "lucide-react";
import Image from "next/image";
import React from "react";

const SellerHome = () => {
  return (
    <div className="w-full h-screen grid grid-cols-1 md:grid-cols-2 ">
      {/* Left Side - Hero Image */}
      <div className="grid-cols-1 relative">
        <Image
          src="/Seller-home-banner.jpg"
          alt="Woman with curly hair holding packages and phone"
          className="w-full h-full object-cover"
          width={800}
          height={800}
        />
      </div>

      {/* Success Notification Overlay */}
      <div className="absolute top-1/2 left-24 bg-transparent border border-gray-100 shadow-lg p-4 flex items-center space-x-3 max-w-xs">
        <div className="w-8 h-8 bg-[#4caf50] rounded-full flex items-center justify-center">
          <Check className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="text-[#1c1c1c] font-medium text-sm md:text-base">
            Your item sold
          </p>
          <p className="text-[#1c1c1c] font-semibold">£8.99</p>
        </div>
      </div>
    </div>
  );
};

export default SellerHome;
