/** @format */
"use client";

import React from "react";
import ListingDetailContent from "@/components/SellerAllComponents/ListingManagementComponents/ListingDetailContent";
import { useParams } from "next/navigation";

const ListingDetailPage = () => {
  const params = useParams();
  const listingId = params.id as string;

  return <ListingDetailContent listingId={listingId} />;
};

export default ListingDetailPage;
