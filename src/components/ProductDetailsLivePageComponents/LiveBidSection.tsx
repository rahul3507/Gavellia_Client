"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import BidSheet from "@/components/ProductsPageComponents/bidSheet";

const LiveBidSection = () => {
  return (
    <div className="w-full max-w-full overflow-hidden mt-8 space-y-3 mb-12">
      <div className="w-full flex justify-between border-b border-gray-200 pb-4">
        <div className="text-xs">Lot 1/14</div>
        <div className="text-green-600 font-semibold text-xs">IN PROGRESS</div>
      </div>
      <div className="w-full flex justify-between">
        <div className="text-gray-600 text-xs">Current Bid</div>
        <div className="text-gray-900 text-base">0 Bids</div>
      </div>

      <div className="text-3xl font-semibold text-gray-800">N/A</div>

      <div className="text-gray-600 mt-4 text-base">The bid is not yours</div>
      <div className="flex space-x-4 mt-4">
        <BidSheet
          bidAmount={300}
          onConfirm={() => console.log("Bid confirmed for £300")}
          onCancel={() => console.log("Bid cancelled")}
        >
          <Button className="bg-black text-white px-6 py-2 rounded-none flex-1">
            BID £300
          </Button>
        </BidSheet>
        <Button className="bg-gray-200 text-black px-6 py-2 rounded-none flex-1">
          SWITCH TO NEXT BID
        </Button>
      </div>
      <div className="text-gray-600 text-sm mt-2">All bids are binding.</div>
    </div>
  );
};

export default LiveBidSection;
