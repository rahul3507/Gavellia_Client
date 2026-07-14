/** @format */

import type { Metadata } from "next";
import React from "react";
import MyBidsContent from "@/components/MyBidsComponents/MyBidsContent";

export const metadata: Metadata = {
  title: "My Bids",
  description:
    "Manage your auction bids. View active, won, and lost bids across all your participating auctions.",
};

const MyBidsPage = () => {
  return <MyBidsContent />;
};

export default MyBidsPage;
