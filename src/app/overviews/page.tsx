/** @format */

import type { Metadata } from "next";
import React from "react";
import OverviewContent from "@/components/OverViewComponents/OverviewContent";

export const metadata: Metadata = {
  title: "Overview",
  description:
    "Your auction dashboard. Track active bids, saved items, spending, and discover new auctions tailored to your interests.",
};

const OverviewsPage = () => {
  return <OverviewContent />;
};

export default OverviewsPage;
