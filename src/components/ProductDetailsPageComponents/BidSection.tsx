"use client";

import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductData } from "@/types/allTypes";

interface BidSectionProps {
  product: ProductData;
  onOpenModal: () => void;
}

const BidSection = ({ product, onOpenModal }: BidSectionProps) => {
  const [selectedBid, setSelectedBid] = useState<string>("");

  const generateBidOptions = () => {
    const startingBid = product.highestBid + 10;
    return Array.from({ length: 5 }, (_, index) => startingBid + index * 10);
  };

  const bidOptions = generateBidOptions();

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Timer */}
      <div className="flex items-center text-xs md:text-sm font-semibold text-primary/50">
        <span className="w-3 h-3 bg-red-500 rounded-full mr-2 animate-pulse"></span>
        {product.time} left
      </div>

      {/* Bid Information */}
      <div className="flex gap-6">
        <div>
          <span className="text-xs md:text-sm text-primary/50 block">Starting</span>
          <span className="text-sm md:text-base font-medium text-primary">
            £{product.starting.toLocaleString()}
          </span>
        </div>
        <div>
          <span className="text-xs md:text-sm text-primary/50 block">Bids</span>
          <span className="text-sm md:text-base font-medium text-primary">
            {product.bids} bidder{product.bids !== 1 ? "s" : ""}
          </span>
        </div>
        <div>
          <span className="text-xs md:text-sm text-primary/50 block">Highest bid</span>
          <span className="text-sm md:text-base font-medium text-primary">
            £{product.highestBid.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Bidding Section */}
      <div className="pb-5 border-b">
        {product.action === "timed" ? (
          <div className="flex space-x-3">
            <Select value={selectedBid} onValueChange={setSelectedBid}>
              <SelectTrigger className="flex-1 h-12 cursor-pointer">
                <SelectValue placeholder="£ Enter Amount" />
              </SelectTrigger>
              <SelectContent>
                {bidOptions.map((bidAmount) => (
                  <SelectItem
                    key={bidAmount}
                    value={bidAmount.toString()}
                    className="cursor-pointer"
                  >
                    £{bidAmount.toLocaleString()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button className="bg-primary hover:bg-primary/90 rounded-none text-white px-8">
              REQUEST TO BID
            </Button>
          </div>
        ) : (
          <div className="flex w-full">
            <Button
              className={`w-full text-white text-center py-5 rounded-none ${
                product.action === "upcoming"
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-black hover:bg-black/90"
              }`}
              disabled={product.action === "upcoming"}
              onClick={() => {
                if (product.action === "live") {
                  onOpenModal();
                }
              }}
            >
              {product.action === "upcoming"
                ? "Auction Starting Soon"
                : "Join the LIVE streaming auction"}{" "}
              <ArrowRight />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BidSection;
