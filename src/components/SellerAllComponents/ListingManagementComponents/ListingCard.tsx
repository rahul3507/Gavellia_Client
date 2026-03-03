/** @format */
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";

type TabType = "timed" | "live" | "sold" | "draft";

export interface Listing {
  id: string;
  title: string;
  image: string;
  timeLeft: string;
  startingPrice: number;
  bids: number;
  highestBid: number;
  status: TabType;
}

interface ListingCardProps {
  listing: Listing;
}

const ListingCard = ({ listing }: ListingCardProps) => {
  return (
    <Link
      href={`/listing-management/${listing.id}`}
      className="bg-card-bg rounded-xl overflow-hidden hover:shadow-md transition group"
    >
      {/* Image */}
      <div className="relative aspect-square bg-gray-100 flex items-center justify-center overflow-hidden">
        <Image
          src={listing.image}
          alt={listing.title}
          width={300}
          height={300}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform"
        />
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="text-sm font-bold text-primary uppercase">
          {listing.title}
        </h3>
        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
          <Clock className="w-3 h-3" />
          {listing.timeLeft}
        </div>

        <div className="grid grid-cols-3 gap-2 mt-3 text-xs">
          <div>
            <p className="text-muted-foreground">Starting</p>
            <p className="font-semibold text-primary">
              £{listing.startingPrice}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">Bids</p>
            <p className="font-semibold text-primary">{listing.bids} bidder</p>
          </div>
          <div>
            <p className="text-muted-foreground">Highest bid</p>
            <p className="font-semibold text-primary">£{listing.highestBid}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 mt-4 pt-3 border-t border-gray-200">
          <button className="text-xs font-bold text-primary hover:underline uppercase cursor-pointer">
            Promote
          </button>
          <button className="text-xs font-bold text-primary hover:underline uppercase cursor-pointer">
            Edit
          </button>
          <button className="text-xs font-bold text-red-500 hover:underline uppercase cursor-pointer">
            Delete
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ListingCard;
