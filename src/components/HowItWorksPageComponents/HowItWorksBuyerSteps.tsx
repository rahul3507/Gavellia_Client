import React from "react";
import { Search, UserCheck, Gavel, CreditCard, Package } from "lucide-react";

const steps = [
  {
    number: 1,
    icon: Search,
    title: "Browse & Discover",
    description:
      "Explore our curated collection of premium items across fashion, art, watches, cars, jewellery, and collectibles.",
  },
  {
    number: 2,
    icon: UserCheck,
    title: "Create Account",
    description:
      "Sign up and complete our verification process to join our trusted community of buyers and collectors.",
  },
  {
    number: 3,
    icon: Gavel,
    title: "Place Your Bid",
    description:
      "Participate in timed or live auctions. Set your maximum bid and let our system work for you.",
  },
  {
    number: 4,
    icon: CreditCard,
    title: "Win & Pay",
    description:
      "Secure your item when the auction ends. Complete payment through our secure checkout process.",
  },
  {
    number: 5,
    icon: Package,
    title: "Receive Your Item",
    description:
      "Track your purchase from shipment to delivery. Our buyer protection ensures a safe transaction.",
  },
];

const HowItWorksBuyerSteps = () => {
  return (
    <div className="mb-12">
      <div className="text-center mb-8">
        <h2 className="text-xl md:text-2xl font-semibold text-primary mb-2">
          For Buyers
        </h2>
        <p className="text-sm text-primary/80 max-w-xl mx-auto">
          From discovery to delivery, here&apos;s how easy it is to acquire
          exceptional pieces on Gavellia.
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

export default HowItWorksBuyerSteps;
