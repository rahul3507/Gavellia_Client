import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const HowItWorksCTA = () => {
  return (
    <div className="bg-primary overflow-hidden">
      <div className="px-2 md:px-4 xl:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-serif text-white mb-4">
              Ready to Start?
            </h2>
            <p className="text-white/80 text-sm md:text-base mb-6">
              Join thousands of buyers and sellers who trust Gavellia for
              premium auctions. Whether you&apos;re looking to acquire
              exceptional pieces or sell your valuable items, we&apos;re here to
              help.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/auth"
                className="bg-white text-primary text-sm font-semibold py-3 px-6 rounded-none hover:bg-white/90 transition inline-flex items-center justify-center gap-2"
              >
                START BUYING
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/seller-home"
                className="bg-transparent border border-white text-white text-sm font-semibold py-3 px-6 rounded-none hover:bg-white/10 transition inline-flex items-center justify-center gap-2"
              >
                START SELLING
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
          <div className="hidden md:flex justify-center">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-white mb-1">40+</div>
                <div className="text-xs text-white/70">Countries</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-white mb-1">100%</div>
                <div className="text-xs text-white/70">Secure</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-white mb-1">24/7</div>
                <div className="text-xs text-white/70">Support</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-white mb-1">Free</div>
                <div className="text-xs text-white/70">Listing</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksCTA;
