/** @format */

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface PricingAndAuctionTypeProps {
  auctionType: string;
  onAuctionTypeChange: (value: string) => void;
  startingPrice: number | undefined;
  onStartingPriceChange: (value: number) => void;
  startDate: string;
  onStartDateChange: (value: string) => void;
  startTime: string;
  onStartTimeChange: (value: string) => void;
  endDate: string;
  onEndDateChange: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
  canContinue: boolean;
}

const PricingAndAuctionType: React.FC<PricingAndAuctionTypeProps> = ({
  auctionType,
  onAuctionTypeChange,
  startingPrice,
  onStartingPriceChange,

  endDate,
  onEndDateChange,
  startDate,
  onStartDateChange,
  startTime,
  onStartTimeChange,
  onNext,
  onBack,
  canContinue,
}) => {
  return (
    <div>
      <h2 className="text-xl md:text-2xl  font-medium  text-primary mb-2">
        Pricing & Auction Type
      </h2>
      <p className="text-primary/70 mb-8">
        Standard pricing attract bidders and get sells more.
      </p>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-primary/70 mb-2">
            Minimum price
          </label>
          <Input
            type="number"
            placeholder="£ Set starting price for auction"
            value={startingPrice === undefined ? "" : startingPrice}
            onChange={(e) => onStartingPriceChange(Number(e.target.value))}
            min={0}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-primary/70 mb-4">
            Select the auction type
          </label>
          <div className="flex space-x-4">
            <button
              onClick={() => onAuctionTypeChange("LIVE")}
              className={`flex-1 p-4 border rounded-lg text-center ${
                auctionType === "LIVE"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full mx-auto mb-2 ${
                  auctionType === "LIVE" ? "bg-blue-500" : "bg-gray-300"
                }`}
              />
              <span className="font-medium">LIVE Auction</span>
            </button>
            <button
              onClick={() => onAuctionTypeChange("TIMED")}
              className={`flex-1 p-4 border rounded-lg text-center ${
                auctionType === "TIMED"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full mx-auto mb-2 ${
                  auctionType === "TIMED" ? "bg-blue-500" : "bg-gray-300"
                }`}
              />
              <span className="font-medium">Timed Auction</span>
            </button>
          </div>
        </div>

        {auctionType === "LIVE" && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-primary/70 mb-2">
                Start date
              </label>
              <div className="relative flex items-end">
                <Input
                  type="date"
                  placeholder="DD/MM/YY"
                  value={startDate}
                  onChange={(e) => onStartDateChange(e.target.value)}
                  className="pr-10"
                />
                <Input
                  type="time"
                  placeholder="Start time"
                  value={startTime}
                  onChange={(e) => onStartTimeChange(e.target.value)}
                  className="ml-2 w-32"
                />
              </div>
              <p className="text-xs text-primary/50 mt-1">
                Set the date and time when your lot will go live
              </p>
            </div>
          </div>
        )}
        {auctionType === "TIMED" && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-primary/70 mb-2">
                Start date
              </label>
              <div className="relative flex items-end">
                <Input
                  type="date"
                  placeholder="DD/MM/YY"
                  value={startDate}
                  onChange={(e) => onStartDateChange(e.target.value)}
                  className="pr-10"
                />
              </div>
              <p className="text-xs text-primary/50 mt-1">
                Based on the selected date your lot will get live to the bidders
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-primary/70 mb-2">
                End date
              </label>
              <div className="relative">
                <Input
                  type="date"
                  placeholder="DD/MM/YY"
                  value={endDate}
                  onChange={(e) => onEndDateChange(e.target.value)}
                  className="pr-10"
                />
              </div>
              <p className="text-xs text-primary/50 mt-1">
                Select the date when you want to end the timeline of your
                auction
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between mt-8">
        <Button onClick={onBack} variant="outline" className="px-6 py-2">
          BACK
        </Button>
        <Button
          onClick={onNext}
          disabled={!canContinue}
          className="bg-primary hover:bg-primary/90 text-white px-6 py-2"
        >
          CONTINUE
        </Button>
      </div>
    </div>
  );
};

export default PricingAndAuctionType;
