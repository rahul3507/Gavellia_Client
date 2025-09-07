/** @format */

import React from "react";
import { Button } from "@/components/ui/button";

import Image from "next/image";

interface SuccessProps {
  onGoToDashboard: () => void;
}

const Success: React.FC<SuccessProps> = ({ onGoToDashboard }) => {
  return (
    <div className="min-h-screen md:min-h-[700px]  flex flex-col items-center mt-36 px-2 md:px-0 space-y-4">
      <div className="">
        <Image
          src="/success_banner.png"
          alt="Placeholder"
          width={128}
          height={96}
          className="rounded-lg max-w-56 max-h-32"
        />
        <h2 className="text-base md:text-lg font-semibold text-primary ">
          You&apos;re done!
        </h2>
      </div>
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-8 ">
        <div className="mb-6">
          <h3 className=" text-primary text-sm md:text-base font-medium mb-2">
            Your lot is in under review
          </h3>
          <p className="text-xs md:text-sm text-primary/70 mb-2">
            Thank you for submitting your lot. You&apos;ll get an email once
            we&apos;re done reviewing.
          </p>
          <p className="text-sm text-gray-600">
            <strong>Review time: 48 hours</strong>
          </p>
        </div>
      </div>
      <Button
        onClick={onGoToDashboard}
        className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-2"
      >
        RETURN HOME
      </Button>
    </div>
  );
};

export default Success;
