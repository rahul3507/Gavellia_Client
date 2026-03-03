/** @format */
import React from "react";
import Image from "next/image";
import { Clock } from "lucide-react";

export type BidTab = "active" | "won" | "lost";

export interface BidItem {
  id: number;
  title: string;
  lot: string;
  image: string;
  myBid: number;
  isHighest: boolean;
  status: "Winning" | "Outbid" | "Winner" | "Lost";
  time: string;
  finalAmount?: number;
}

interface BidListItemProps {
  item: BidItem;
  tab: BidTab;
}

const statusColors: Record<string, string> = {
  Winning: "text-green-500",
  Outbid: "text-red-500",
  Winner: "text-green-500",
  Lost: "text-red-500",
};

const BidListItem = ({ item, tab }: BidListItemProps) => {
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
        <div className="flex items-center gap-2 mt-1 flex-wrap">
          <p className="text-xs sm:text-sm text-primary">
            My Bid{" "}
            <span className="font-bold">£{item.myBid.toLocaleString()}</span>
          </p>
          {tab === "active" && (
            <span
              className={`text-[10px] sm:text-xs font-semibold ${
                item.isHighest ? "text-green-500" : "text-red-500"
              }`}
            >
              {item.isHighest ? "Highest" : "Not highest"}
            </span>
          )}
          {tab === "won" && (
            <span className="text-[10px] sm:text-xs font-semibold text-green-500">
              Winner
            </span>
          )}
        </div>
        {(tab === "won" || tab === "lost") && (
          <div className="flex items-center gap-1 text-[10px] sm:text-xs text-muted-foreground mt-1">
            <Clock className="w-3 h-3" />
            {item.time}
          </div>
        )}
      </div>

      {/* Right side */}
      <div className="flex flex-col items-end shrink-0 gap-1">
        {tab === "active" ? (
          <>
            <div className="flex items-center gap-1 text-[10px] sm:text-xs text-muted-foreground">
              <Clock className="w-3 h-3" />
              {item.time}
            </div>
            <span
              className={`text-xs sm:text-sm font-semibold ${
                statusColors[item.status]
              }`}
            >
              {item.status}
            </span>
          </>
        ) : tab === "won" ? (
          <>
            <p className="text-lg sm:text-xl font-bold text-primary">
              £{(item.finalAmount ?? item.myBid).toLocaleString()}
            </p>
            <button className="bg-primary text-white text-[10px] sm:text-xs font-semibold px-4 py-1.5 rounded hover:bg-primary/90 transition">
              PAY NOW
            </button>
          </>
        ) : (
          <>
            <div className="flex items-center gap-1 text-[10px] sm:text-xs text-muted-foreground">
              <Clock className="w-3 h-3" />
              {item.time}
            </div>
            <span className="text-xs sm:text-sm font-semibold text-red-500">
              Lost
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default BidListItem;
