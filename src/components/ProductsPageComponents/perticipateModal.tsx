/** @format */
"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";

interface ParticipateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productTitle: string;
}

const ParticipateModal: React.FC<ParticipateModalProps> = ({
  open,
  onOpenChange,
  productTitle,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const router = useRouter();

  const handleConfirm = async () => {
    setIsLoading(true);
    // Simulate API call for requesting auction paddle
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsConfirmed(true);
    setIsLoading(false);
  };

  // Generate random paddle number for demo
  const paddleNumber = Math.floor(Math.random() * 99) + 1;

  const handleCancel = () => {
    setIsConfirmed(false);
    setIsLoading(false);
    onOpenChange(false);
  };
  const urlTitle = productTitle.toLowerCase().replace(/\s+/g, "-");
  const handleJoin = () => {
    setIsConfirmed(false);
    setIsLoading(false);
    onOpenChange(false);
    router.push(`/products/${urlTitle}/live`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md mx-auto bg-white rounded-lg shadow-xl">
        <DialogHeader className="relative">
          <DialogTitle className="text-xl font-semibold text-left pr-8">
            {isConfirmed ? "Registration Successful" : "Participate In Auction"}
          </DialogTitle>
          <p className="text-sm text-gray-500 text-left">
            {isConfirmed ? "Step 2 of 2" : "Step 1 of 2"}
          </p>
        </DialogHeader>

        <div className="py-4 border-t border-gray-100">
          {!isConfirmed && !isLoading ? (
            // Initial confirmation state
            <div className="space-y-6">
              <div className=" space-y-2 text-base">
                <p className="text-gray-700">
                  Confirm your attendance for{" "}
                  <span className="font-semibold text-black">
                    &apos;{productTitle.toUpperCase()}&apos;
                  </span>{" "}
                  on
                </p>
                <p className="text-gray-700">June 7, 2025, at 1:00 PM.</p>
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                <Button
                  onClick={handleConfirm}
                  className="bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-none"
                >
                  CONFIRM
                </Button>
                <Button
                  onClick={handleCancel}
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 rounded-none"
                >
                  CANCEL
                </Button>
              </div>
            </div>
          ) : isLoading ? (
            // Loading state
            <div className="space-y-6">
              <div className="text-center space-y-4">
                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                  <div className="flex items-center justify-center space-x-3">
                    <Loader className="h-5 w-5 animate-spin text-gray-600" />
                    <span className="text-gray-700 font-medium">
                      Requesting auction paddle
                    </span>
                  </div>
                </div>
                <p className="text-gray-700">
                  Register to participate in the auction for{" "}
                  <span className="font-semibold text-black">
                    &quot;{productTitle.toUpperCase()}&quot;
                  </span>
                </p>
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                <Button
                  disabled
                  className="bg-black text-white px-8 py-3 rounded-none opacity-50 cursor-not-allowed"
                >
                  CONFIRM
                </Button>
                <Button
                  onClick={handleCancel}
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 rounded-none"
                >
                  CANCEL
                </Button>
              </div>
            </div>
          ) : (
            // Success state - Registration Successful
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-lg font-bold text-black">
                  REGISTRATION SUCCESSFUL. CONGRATS!
                </h2>
                <p className="text-gray-700 text-sm">
                  Wishing you the best in the auction. Your bidding paddle is
                  displayed below and will be sent to you via email for your
                  records.
                </p>
              </div>

              {/* Paddle Number Display */}
              <div className="flex justify-center">
                <div className="w-44 h-36 bg-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-6xl font-bold text-black">
                    {paddleNumber}
                  </span>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="text-sm text-gray-600">
                By joining the auction you agree to all{" "}
                <span className="text-blue-500 underline cursor-pointer">
                  Terms and Conditions.
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4 pt-4">
                <Button
                  onClick={handleJoin}
                  className="bg-black hover:bg-gray-800 text-white px-6 py-2 rounded-none"
                >
                  JOIN NOW
                </Button>
                <Button
                  onClick={handleCancel}
                  variant="outline"
                  className="border-gray-300 text-gray-700 bg-gray-100 hover:bg-gray-200 px-6 py-2 rounded-none"
                >
                  CANCEL
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ParticipateModal;
