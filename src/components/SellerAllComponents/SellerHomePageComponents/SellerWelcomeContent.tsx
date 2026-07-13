"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { PiCoatHanger } from "react-icons/pi";
import { useRouter } from "next/navigation";

const SellerWelcomeContent = () => {
  const router = useRouter();

  const handleStartCreating = () => {
    router.push("/create-lot");
  };

  return (
    <div className="grid-col-1 flex justify-center lg:justify-normal p-8 pb-0 lg:p-16">
      <div className="text-center lg:text-left">
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
  );
};

export default SellerWelcomeContent;
