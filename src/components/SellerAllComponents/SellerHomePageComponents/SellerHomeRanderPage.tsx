"use client";

import React from "react";
import SellerHeroBanner from "./SellerHeroBanner";
import SellerWelcomeContent from "./SellerWelcomeContent";

const SellerHomeRanderPage = () => {
  return (
    <div className="w-full h-screen grid grid-cols-1 md:grid-cols-2">
      <SellerHeroBanner />
      <SellerWelcomeContent />
    </div>
  );
};

export default SellerHomeRanderPage;
