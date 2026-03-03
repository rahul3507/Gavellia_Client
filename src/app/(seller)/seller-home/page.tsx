/** @format */

"use client";

import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { PiCoatHanger } from "react-icons/pi";

const SellerHome = () => {
  const router = useRouter();

  const handleStartCreating = () => {
    router.push("/create-lot");
  };

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

        {/* Success Notification Overlay   */}
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

      {/* Right Side - Welcome Content */}
      <div className="grid-col-1 flex justify-center lg:justify-normal p-8 pb-0 lg:p-16">
        <div className=" text-center lg:text-left">
          {/* Greeting */}
          <h2 className="text-xl md:text-2xl text-primary mb-2">Hey Lee,</h2>
          <h3 className="text-xl md:text-2xl text-primary mb-12">
            Welcome to Gavellia
          </h3>

          <div className="max-w-[330px] max-h-[345px] flex flex-col justify-center items-center p-4 md:p-8 border border-gray-100">
            {/* Hanger Icon */}
            <div className="mb-8">
              <PiCoatHanger className="w-12 h-12 mx-auto text-primary" />
            </div>

            {/* Main Content */}
            <h4 className="text-xl md:text-2xl font-semibold text-primary mb-4 text-center">
              Create your first listing
            </h4>
            <p className="text-primary text-xs md:text-sm leading-relaxed mb-8 text-center">
              Show off your items, antiques & artwork. Set auction type and get
              it sold.
            </p>

            {/* CTA Button */}
            <Button
              onClick={handleStartCreating}
              className="bg-primary hover:bg-primary/90 rounded-none text-white font-medium px-8 py-3 text-sm tracking-wide"
            >
              START CREATING
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerHome;
