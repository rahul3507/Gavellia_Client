/** @format */

import React from "react";

const Footer = () => {
  return (
    <footer className="bg-card-bg mt-16">
      <div className="w-full  px-8 sm:px-8 lg:px-16 xl:px-24 2xl:px-32 py-12">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          <div>
            <h3 className="font-semibold text-[#1c1c1c] mb-4">Marketplace</h3>
            <ul className="space-y-2 text-sm text-[#1c1c1c]/70">
              <li>
                <a href="#" className="hover:text-[#79764f]">
                  Live Auctions
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#79764f]">
                  Shop Products
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#79764f]">
                  Trending Deals
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#79764f]">
                  Flash Sales
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-[#1c1c1c] mb-4">Categories</h3>
            <ul className="space-y-2 text-sm text-[#1c1c1c]/70">
              <li>
                <a href="#" className="hover:text-[#79764f]">
                  Fashion & Apparel
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#79764f]">
                  Electronics
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#79764f]">
                  Home & Living
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#79764f]">
                  Collectibles
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#79764f]">
                  Luxury Items
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-[#1c1c1c] mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-[#1c1c1c]/70">
              <li>
                <a href="#" className="hover:text-[#79764f]">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#79764f]">
                  Shipping Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#79764f]">
                  Returns & Refunds
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#79764f]">
                  Contact Support
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-[#1c1c1c] mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-[#1c1c1c]/70">
              <li>
                <a href="#" className="hover:text-[#79764f]">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#79764f]">
                  Career
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#79764f]">
                  Blogs
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-[#1c1c1c] mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-[#1c1c1c]/70">
              <li>
                <a href="#" className="hover:text-[#79764f]">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#79764f]">
                  Career
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#79764f]">
                  Blogs
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-[#1c1c1c] mb-4">
              Download Our App
            </h3>
            <div className="space-y-2">
              <img
                src="/app-store-download-button.png"
                alt="App Store"
                className="h-10"
              />
              <img
                src="/google-play-download-button.png"
                alt="Google Play"
                className="h-10"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-[#e9e9e9] mt-8 pt-8 flex justify-between items-center">
          <div className="text-sm text-[#1c1c1c]/70">
            © 2024 Vendra Inc.{" "}
            <a href="#" className="hover:text-[#79764f]">
              Terms of Service
            </a>{" "}
            <a href="#" className="hover:text-[#79764f]">
              Privacy Policy
            </a>
          </div>
          <div className="flex space-x-4">
            <div className="w-6 h-6 bg-[#1877f2] rounded"></div>
            <div className="w-6 h-6 bg-[#1c1c1c] rounded"></div>
            <div className="w-6 h-6 bg-[#0a66c2] rounded"></div>
            <div className="w-6 h-6 bg-[#ff0302] rounded"></div>
          </div>
        </div>
      </div>

      {/* Large Gavellia Logo */}
      <div className="text-center py-16">
        <h1 className="text-8xl font-serif text-[#1c1c1c]">Gavellia</h1>
      </div>
    </footer>
  );
};

export default Footer;
