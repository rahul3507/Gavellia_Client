import React from "react";
import HowItWorksHero from "./HowItWorksHero";
import HowItWorksBuyerSteps from "./HowItWorksBuyerSteps";
import HowItWorksSellerSteps from "./HowItWorksSellerSteps";
import HowItWorksAuctionTypes from "./HowItWorksAuctionTypes";
import HowItWorksCTA from "./HowItWorksCTA";

const HowItWorksRanderPage = () => {
  return (
    <div className="w-full px-2 md:px-4 xl:px-6 mb-12">
      <HowItWorksHero />
      <HowItWorksBuyerSteps />
      <HowItWorksSellerSteps />
      <HowItWorksAuctionTypes />
      <HowItWorksCTA />
    </div>
  );
};

export default HowItWorksRanderPage;
