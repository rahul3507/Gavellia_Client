import React from "react";
import {
  UserPlus,
  Camera,
  Clock,
  TrendingUp,
  Truck,
} from "lucide-react";

const steps = [
  {
    number: 1,
    icon: UserPlus,
    title: "Register as Seller",
    description:
      "Create your seller account and complete our verification process to start listing items.",
  },
  {
    number: 2,
    icon: Camera,
    title: "Create Your Lot",
    description:
      "Upload high-quality photos and provide detailed descriptions of your premium items.",
  },
  {
    number: 3,
    icon: Clock,
    title: "Set Auction Parameters",
    description:
      "Choose between timed or live auction, set starting price, reserve price, and duration.",
  },
  {
    number: 4,
    icon: TrendingUp,
    title: "Auction Goes Live",
    description:
      "Watch bids come in real-time. Our platform promotes your listing to qualified buyers.",
  },
  {
    number: 5,
    icon: Truck,
    title: "Ship & Get Paid",
    description:
      "Once the auction ends, ship the item and receive secure payment through our escrow system.",
  },
];

const HowItWorksSellerSteps = () => {
  return (
    <div className="mb-12">
      <div className="text-center mb-8">
        <h2 className="text-xl md:text-2xl font-semibold text-primary mb-2">
          For Sellers
        </h2>
        <p className="text-sm text-primary/80 max-w-xl mx-auto">
          Turn your premium items into competitive auctions and reach
          collectors worldwide.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {steps.map((step) => (
          <div
            key={step.number}
            className="bg-white border border-gray-100 rounded-xl p-5 text-center hover:shadow-md transition group"
          >
            <div className="w-12 h-12 rounded-full bg-card-bg flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
              <step.icon className="w-5 h-5 text-primary group-hover:text-white" />
            </div>
            <div className="text-xs font-semibold text-primary/50 mb-1">
              Step {step.number}
            </div>
            <h3 className="text-sm font-bold text-primary mb-2">
              {step.title}
            </h3>
            <p className="text-xs text-primary/70 leading-relaxed">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorksSellerSteps;
