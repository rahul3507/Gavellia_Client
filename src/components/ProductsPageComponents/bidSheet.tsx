/** @format */
"use client";

import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

interface BidSheetProps {
  children: React.ReactNode;
  bidAmount: number;
  onConfirm?: () => void;
  onCancel?: () => void;
}

const BidSheet: React.FC<BidSheetProps> = ({
  children,
  bidAmount,
  onConfirm,
  onCancel,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirm = () => {
    onConfirm?.();
    setIsOpen(false);
    console.log(`Bid confirmed: £${bidAmount}`);
  };

  const handleCancel = () => {
    onCancel?.();
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        side="bottom-right"
        hideClose={true}
        className="h-auto w-96 max-w-96 rounded-lg bg-gray-900 text-white p-8 border-0 shadow-2xl"
      >
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h2 className="text-2xl font-normal text-white mb-4">
              Are you sure?
            </h2>
            <p className="text-gray-300 text-base leading-relaxed">
              You about to enter the bidding. Single click bidding will be
              enabled.
            </p>
          </div>

          {/* Bid Amount */}
          <div>
            <p className="text-white text-base mb-2">Bid</p>
            <p className="text-5xl font-light text-white">£{bidAmount}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <SheetClose asChild>
              <Button
                onClick={handleConfirm}
                className="flex-1 h-12 bg-white text-black hover:bg-gray-100 rounded-none font-medium text-base"
              >
                CONFIRM
              </Button>
            </SheetClose>
            <SheetClose asChild>
              <Button
                onClick={handleCancel}
                variant="outline"
                className="flex-1 h-12 bg-transparent border-gray-600 text-white hover:text-gray-50 hover:bg-transparent rounded-none font-medium text-base"
              >
                CANCEL
              </Button>
            </SheetClose>
          </div>

          {/* Terms */}
          <p className="text-gray-400 text-sm ">All bids are binding.</p>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default BidSheet;
