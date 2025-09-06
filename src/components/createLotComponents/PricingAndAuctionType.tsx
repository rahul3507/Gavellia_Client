/** @format */

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar, Clock } from "lucide-react";

interface PricingAndAuctionTypeProps {
  auctionType: string;
  onAuctionTypeChange: (value: string) => void;
  startingPrice: string;
  onStartingPriceChange: (value: string) => void;
  estimatedValue: string;
  onEstimatedValueChange: (value: string) => void;
  auctionDuration: string;
  onAuctionDurationChange: (value: string) => void;
  startDate: string;
  onStartDateChange: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
  canContinue: boolean;
}

const PricingAndAuctionType: React.FC<PricingAndAuctionTypeProps> = ({
  auctionType,
  onAuctionTypeChange,
  startingPrice,
  onStartingPriceChange,
  estimatedValue,
  onEstimatedValueChange,
  auctionDuration,
  onAuctionDurationChange,
  startDate,
  onStartDateChange,
  onNext,
  onBack,
  canContinue,
}) => {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-2">
        Pricing and Auction Type
      </h2>
      <p className="text-gray-600 mb-8">
        Set your auction parameters and pricing information.
      </p>

      <div className="space-y-6">
        {/* Auction Type */}
        <div>
          <Label className="text-base font-medium text-gray-900 mb-4 block">
            Auction Type
          </Label>
          <RadioGroup
            value={auctionType}
            onValueChange={onAuctionTypeChange}
            className="space-y-3"
          >
            <div className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
              <RadioGroupItem value="english" id="english" />
              <div className="flex-1">
                <Label htmlFor="english" className="font-medium cursor-pointer">
                  English Auction
                </Label>
                <p className="text-sm text-gray-600">
                  Traditional bidding where price increases
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
              <RadioGroupItem value="dutch" id="dutch" />
              <div className="flex-1">
                <Label htmlFor="dutch" className="font-medium cursor-pointer">
                  Dutch Auction
                </Label>
                <p className="text-sm text-gray-600">
                  Price decreases until someone accepts
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
              <RadioGroupItem value="reserve" id="reserve" />
              <div className="flex-1">
                <Label htmlFor="reserve" className="font-medium cursor-pointer">
                  Reserve Auction
                </Label>
                <p className="text-sm text-gray-600">
                  Bidding with a minimum reserve price
                </p>
              </div>
            </div>
          </RadioGroup>
        </div>

        {/* Pricing Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="startingPrice" className="text-base font-medium">
              Starting Price
            </Label>
            <div className="mt-2 relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                $
              </span>
              <Input
                id="startingPrice"
                type="number"
                value={startingPrice}
                onChange={(e) => onStartingPriceChange(e.target.value)}
                className="pl-8"
                placeholder="0.00"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="estimatedValue" className="text-base font-medium">
              Estimated Value
            </Label>
            <div className="mt-2 relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                $
              </span>
              <Input
                id="estimatedValue"
                type="number"
                value={estimatedValue}
                onChange={(e) => onEstimatedValueChange(e.target.value)}
                className="pl-8"
                placeholder="0.00"
              />
            </div>
          </div>
        </div>

        {/* Auction Duration and Start Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="duration" className="text-base font-medium">
              Auction Duration
            </Label>
            <div className="mt-2 relative">
              <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select
                id="duration"
                value={auctionDuration}
                onChange={(e) => onAuctionDurationChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select duration</option>
                <option value="1">1 Day</option>
                <option value="3">3 Days</option>
                <option value="7">7 Days</option>
                <option value="14">14 Days</option>
                <option value="30">30 Days</option>
              </select>
            </div>
          </div>

          <div>
            <Label htmlFor="startDate" className="text-base font-medium">
              Start Date
            </Label>
            <div className="mt-2 relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                id="startDate"
                type="datetime-local"
                value={startDate}
                onChange={(e) => onStartDateChange(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>

        {/* Commission Information */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">
            Commission Structure
          </h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Buyer&apos;s Premium: 10% on winning bids</li>
            <li>• Seller&apos;s Commission: 5% on final sale price</li>
            <li>• Payment Processing: 2.9% + $0.30 per transaction</li>
          </ul>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <Button onClick={onBack} variant="outline" className="px-6 py-2">
          BACK
        </Button>
        <Button
          onClick={onNext}
          disabled={!canContinue}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
        >
          CONTINUE
        </Button>
      </div>
    </div>
  );
};

export default PricingAndAuctionType;
