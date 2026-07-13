import React from "react";
import Image from "next/image";
import { Trophy, Clock } from "lucide-react";
import { PurchaseItem } from "@/types/allTypes";

interface PurchaseListItemProps {
  item: PurchaseItem;
}

const PurchaseListItem = ({ item }: PurchaseListItemProps) => {
  return (
    <div className="flex items-center gap-3 sm:gap-4 py-4 sm:py-5 border-b border-gray-100 last:border-b-0">
      {/* Image */}
      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden bg-gray-100 shrink-0">
        <Image
          src={item.image}
          alt={item.title}
          width={64}
          height={64}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3 className="text-xs sm:text-sm font-bold text-primary uppercase truncate">
          {item.title}
        </h3>
        <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5">
          Lot {item.lot}
        </p>
        <p className="text-xs sm:text-sm text-primary mt-0.5">
          My Bid{" "}
          <span className="font-bold">£{item.myBid.toLocaleString()}</span>
        </p>
        <div className="flex items-center gap-3 mt-1 flex-wrap text-[10px] sm:text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Trophy className="w-3 h-3 text-green-500" />
            Auction Won on: {item.auctionWonDate}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Payment due on: {item.paymentDueDate}
          </span>
        </div>
      </div>

      {/* Right: Amount + Pay */}
      <div className="flex flex-col items-end shrink-0 gap-1.5">
        <p className="text-lg sm:text-xl font-bold text-primary">
          £{item.amount.toLocaleString()}
        </p>
        <button className="bg-primary text-white text-[10px] sm:text-xs font-semibold px-4 py-1.5 rounded hover:bg-primary/90 transition">
          PAY NOW
        </button>
      </div>
    </div>
  );
};

export default PurchaseListItem;
