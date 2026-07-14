/** @format */

import type { Metadata } from "next";
import React from "react";
import PurchasesContent from "@/components/PurchasesComponents/PurchasesContent";

export const metadata: Metadata = {
  title: "Purchases",
  description:
    "Track your purchases from payment to delivery. View order history, shipping status, and manage your collected items.",
};

const PurchasesPage = () => {
  return <PurchasesContent />;
};

export default PurchasesPage;
