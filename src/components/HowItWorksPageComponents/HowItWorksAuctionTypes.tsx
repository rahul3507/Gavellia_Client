import React from "react";
import { Timer, Radio, Check } from "lucide-react";

const auctionTypes = [
  {
    icon: Timer,
    title: "Timed Auctions",
    description:
      "Set a fixed duration for your auction. Bidders place bids over the specified period, and the highest bidder wins when time expires.",
    features: [
      "Fixed end time",
      "Automatic bid extensions",
      "Set your reserve price",
      "Best for rare collectibles",
    ],
  },
  {
    icon: Radio,
    title: "Live Auctions",
    description:
      "Experience the excitement of real-time bidding. Watch as bids come in instantly and compete with other buyers in real-time.",
    features: [
      "Real-time bidding",
      "Instant notifications",
      "Compete live with others",
      "Best for high-demand items",
    ],
  },
];

const HowItWorksAuctionTypes = () => {
  return (
    <div className="mb-12">
      <div className="text-center mb-8">
        <h2 className="text-xl md:text-2xl font-semibold text-primary mb-2">
          Auction Types
        </h2>
        <p className="text-sm text-primary/80 max-w-xl mx-auto">
          Choose the auction format that works best for your items and buying
          style.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {auctionTypes.map((type) => (
          <div
            key={type.title}
            className="bg-white border border-gray-100 rounded-xl p-6 hover:shadow-md transition"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-500 flex items-center justify-center">
                <type.icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-base font-semibold text-primary">
                {type.title}
              </h3>
            </div>
            <p className="text-sm text-primary/80 mb-4 leading-relaxed">
              {type.description}
            </p>
            <ul className="space-y-2">
              {type.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-green-500 shrink-0" />
                  <span className="text-primary/80">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorksAuctionTypes;
