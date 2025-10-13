/** @format */

import React from "react";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";

interface VerificationStepProps {
  formData: {
    email: string;
  };
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const VerificationStep = ({
  formData,
  isLoading,
  setIsLoading,
}: VerificationStepProps) => {
  return (
    <div className="space-y-2">
      <div className="flex flex-col space-y-0 h-full">
        <div className="pt-6">
          <h2 className="text-lg md:text-2xl font-semibold text-gray-900 mb-4">
            Verify Your Email
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            We&apos;ve sent an email to{" "}
            <span className="font-medium">
              {formData.email || "exam***@gmail.com"}
            </span>
            . Click on inside to get started.
          </p>
        </div>

        <div className=" flex flex-col mt-auto text-left w-fit">
          <Button
            onClick={() => {
              // Open default email client
              window.location.href = "mailto:";
            }}
            variant="ghost"
            className=" text-gray-600 font-semibold  p-0 rounded-none hover:bg-transparent underline disabled:opacity-50"
          >
            GO TO MAILBOX
          </Button>

          <Button
            onClick={async () => {
              setIsLoading(true);
              // Simulate resend email
              await new Promise((resolve) => setTimeout(resolve, 1000));
              setIsLoading(false);
            }}
            disabled={isLoading}
            variant="ghost"
            className=" text-gray-600 font-semibold  p-0 rounded-none hover:bg-transparent underline disabled:opacity-50"
          >
            <span className="flex items-center gap-2">
              RESEND EMAIL
              {isLoading && <Loader className="animate-spin h-4 w-4" />}
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VerificationStep;
