/** @format */

import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface PublishProps {
  onPublish: () => void;
  onBack: () => void;
}

const Publish: React.FC<PublishProps> = ({ onPublish, onBack }) => {
  return (
    <div>
      <h2 className="text-xl md:text-2xl  font-medium  text-primary mb-2">
        Publish
      </h2>
      <p className="text-primary/70 text-xs md:text-sm mb-8">
        Submit your lot for review. It will get LIVE once the admin approve. If
        not we will let know inform by sending email.
      </p>

      <div className="flex justify-center mb-8">
        <Image
          src="/publish_banner.png"
          alt="Placeholder"
          width={128}
          height={96}
          className="rounded-lg max-w-56 max-h-32"
        />
      </div>

      <div className=" text-xs md:text-sm text-primary/70 mb-8">
        By submitting you are agree with or{" "}
        <a href="#" className="text-blue-600 underline">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="text-blue-600 underline">
          Privacy Policy
        </a>
        .
      </div>

      <div className="flex justify-between">
        <Button onClick={onBack} variant="outline" className="px-6 py-2">
          BACK
        </Button>
        <Button
          onClick={onPublish}
          className="bg-black hover:bg-gray-800 text-white px-6 py-2"
        >
          SUBMIT
        </Button>
      </div>
    </div>
  );
};

export default Publish;
