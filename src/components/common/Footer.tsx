/** @format */

import React from "react";
import { FaApple, FaFacebook, FaLinkedin, FaYoutube } from "react-icons/fa";

import Image from "next/image";
import { FaX, FaXTwitter } from "react-icons/fa6";
import { Button } from "../ui/button";

const Footer = () => {
  return (
    <footer className="bg-card-bg mt-16">
      <div className="w-full  px-8 sm:px-8 lg:px-16 xl:px-24 2xl:px-32 pt-12">
        <div className="w-full grid  grid-cols-2 md:grid-cols-5 gap-8 ">
          <div className="">
            <h3 className="text-sm text-primary mb-4">Marketplace</h3>
            <ul className="space-y-2 text-sm md:text-base text-primary">
              <li>
                <a href="#" className=" hover:text-primary/70">
                  Live Auctions
                </a>
              </li>
              <li>
                <a href="#" className=" hover:text-primary/70">
                  Shop Products
                </a>
              </li>
              <li>
                <a href="#" className=" hover:text-primary/70">
                  Trending Deals
                </a>
              </li>
              <li>
                <a href="#" className=" hover:text-primary/70">
                  Flash Sales
                </a>
              </li>
            </ul>
          </div>
          <div className="">
            <h3 className="text-sm text-primary mb-4">Categories</h3>
            <ul className="space-y-2 text-sm md:text-base text-primary">
              <li>
                <a href="#" className="hover:text-primary/70">
                  Fashion & Apparel
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary/70">
                  Electronics
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary/70">
                  Home & Living
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary/70">
                  Collectibles
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary/70">
                  Luxury Items
                </a>
              </li>
            </ul>
          </div>
          <div className="">
            <h3 className="text-sm text-primary mb-4">Support</h3>
            <ul className="space-y-2 text-sm md:text-base text-primary">
              <li>
                <a href="#" className="hover:text-primary/70">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary/70">
                  Shipping Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary/70">
                  Returns & Refunds
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary/70">
                  Contact Support
                </a>
              </li>
            </ul>
          </div>

          <div className="">
            <h3 className="text-sm text-primary mb-4">Company</h3>
            <ul className="space-y-2 text-sm md:text-base text-primary">
              <li>
                <a href="#" className="hover:text-primary/70">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary/70">
                  Career
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary/70">
                  Blogs
                </a>
              </li>
            </ul>
          </div>
          <div className="">
            <h3 className="text-sm text-primary mb-4">Download Our App</h3>
            <div className="space-y-2">
              <Button className="flex items-center space-x-2 border-none px-3 py-2 rounded cursor-pointer w-max bg-white hover:bg-white/70 text-primary">
                <FaApple />
                <div className="pr-2.5">
                  <p className="text-[8px]">Download on the</p>
                  <p className="text-sm">App Store</p>
                </div>
              </Button>
              <Button className="flex items-center space-x-0 border-none px-3 py-2 rounded cursor-pointer w-max bg-white hover:bg-white/70 text-primary">
                <Image
                  src="/playstore.png"
                  alt="Google Play"
                  width={20}
                  height={20}
                />
                <div>
                  <p className="text-[8px]">GET IT ON</p>
                  <p className="text-sm">Google Play</p>
                </div>
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-[#e9e9e9] mt-6 pt-4 flex justify-between items-center">
          <div className="text-sm md:text-base text-primary/70 gap-8">
            © 2024 Vendra Inc.{" "}
            <a href="#" className="text-link hover:text-link ml-2 underline">
              Terms of Service
            </a>{" "}
            <a href="#" className="text-link hover:text-link ml-2 underline">
              Privacy Policy
            </a>
          </div>
          <div className="flex space-x-4">
            <Button className="w-6 h-6 bg-white text-[#1877f2] flex justify-center items-center">
              <FaFacebook className="" />
            </Button>
            <Button className="w-6 h-6 bg-white text-[#1c1c1c] rounded flex justify-center items-center">
              <FaXTwitter />
            </Button>
            <Button className="w-6 h-6 bg-white text-[#0a66c2] rounded flex justify-center items-center">
              <FaLinkedin />
            </Button>
            <Button className="w-6 h-6 bg-white text-[#ff0302] rounded flex justify-center items-center">
              <FaYoutube />
            </Button>
          </div>
        </div>
      </div>

      {/* Large Gavellia Logo */}
      <div className="text-center mt-2 ">
        <h1 className="text-5xl md:text-9xl lg:text-[270px] xl:text-[300px] 2xl:text-[330px] font-serif text-primary ">
          Gavellia
        </h1>
      </div>
    </footer>
  );
};

export default Footer;
