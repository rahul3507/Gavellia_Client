"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { Clock } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchListingDetail, clearSelectedListing } from "@/redux/feature/listingsSlice";
import ParticipantsTable from "./ParticipantsTable";

interface ListingDetailContentProps {
  listingId: string;
}

const ListingDetailContent = ({ listingId }: ListingDetailContentProps) => {
  const dispatch = useAppDispatch();
  const { selectedListing, detailLoading } = useAppSelector(
    (state) => state.listings
  );

  useEffect(() => {
    dispatch(fetchListingDetail(listingId));
    return () => {
      dispatch(clearSelectedListing());
    };
  }, [dispatch, listingId]);

  if (detailLoading) {
    return (
      <div className="w-full px-2 md:px-4 xl:px-6 mb-12">
        <div className="bg-white border border-gray-100 rounded-xl overflow-hidden animate-pulse">
          <div className="p-5 sm:p-8 border-b border-gray-100 space-y-3">
            <div className="h-8 w-1/2 bg-gray-200 rounded" />
            <div className="h-4 w-1/4 bg-gray-200 rounded" />
            <div className="h-4 w-1/3 bg-gray-200 rounded" />
          </div>
          <div className="p-5 sm:p-8 space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4 py-3">
                <div className="w-8 h-8 rounded-full bg-gray-200" />
                <div className="h-4 flex-1 bg-gray-200 rounded" />
                <div className="h-4 w-20 bg-gray-200 rounded" />
                <div className="h-8 w-32 bg-gray-200 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!selectedListing) {
    return (
      <div className="w-full px-2 md:px-4 xl:px-6 mb-12">
        <div className="bg-white border border-gray-100 rounded-xl p-12 text-center">
          <p className="text-muted-foreground">Listing not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-2 md:px-4 xl:px-6 mb-12">
      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
        {/* Header */}
        <div className="p-5 sm:p-8 border-b border-gray-100">
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            {/* Image */}
            <div className="w-full md:w-64 aspect-square rounded-lg overflow-hidden bg-gray-100 shrink-0">
              <Image
                src={selectedListing.image}
                alt={selectedListing.title}
                width={256}
                height={256}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Info */}
            <div className="flex-1">
              <h1 className="text-3xl sm:text-4xl font-bold text-primary font-serif">
                {selectedListing.title}
              </h1>
              <p className="text-sm text-muted-foreground mt-1">Lot #{selectedListing.id}</p>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-3">
                <Clock className="w-4 h-4" />
                {selectedListing.timeLeft} left
              </div>

              <div className="grid grid-cols-3 gap-4 mt-6">
                <div>
                  <p className="text-xs text-muted-foreground">Starting</p>
                  <p className="text-lg font-semibold text-primary">
                    £{selectedListing.startingPrice.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Bids</p>
                  <p className="text-lg font-semibold text-primary">
                    {selectedListing.bids}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Highest Bid</p>
                  <p className="text-lg font-semibold text-primary">
                    £{selectedListing.highestBid.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <span className="text-xs font-medium px-3 py-1 rounded bg-gray-100 text-muted-foreground capitalize">
                  {selectedListing.status}
                </span>
                <span className="text-xs font-medium px-3 py-1 rounded bg-gray-100 text-muted-foreground">
                  {selectedListing.category}
                </span>
                <span className="text-xs font-medium px-3 py-1 rounded bg-gray-100 text-muted-foreground capitalize">
                  {selectedListing.condition}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Participants Table */}
        <ParticipantsTable participants={selectedListing.participants} />
      </div>
    </div>
  );
};

export default ListingDetailContent;
