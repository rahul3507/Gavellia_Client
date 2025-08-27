/** @format */
"use client";
import { Search, ShoppingBag, UserRound } from "lucide-react";
import React from "react";

import Link from "next/link";
import { Button } from "../ui/button";

const Navbar = () => {
  return (
    <div className="mb-12 md:mb-3  bg-white">
      <div className="w-full  px-8 sm:px-8 lg:px-16 xl:px-24 2xl:px-32">
        <div className="flex flex-col md:flex-row items-center justify-between h-16 space-y-2">
          <div className="flex flex-col md:flex-row items-center space-x-8">
            <Link
              href="/"
              className="text-4xl font-bold font-serif text-primary"
            >
              Gavellia
            </Link>
            <nav className=" flex space-x-6">
              <Link
                href="/home"
                className="text-primary hover:text-primary/80 text-sm font-semibold"
              >
                Browse auction
              </Link>
              <a
                href="#"
                className="text-primary hover:text-primary/80 text-sm font-semibold"
              >
                Categories
              </a>
              <a
                href="#"
                className="text-primary hover:text-primary/80 text-sm font-semibold"
              >
                How it works
              </a>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-4 border-r-2 border-r-tertiary pr-4 py-1">
              <Search className="w-5 h-5 text-primary" />
              <ShoppingBag className="w-5 h-5 text-primary" />
              <UserRound className="w-5 h-5 text-primary" />
            </div>

            <Button className="bg-primary hover:bg-primary/90 text-white text-sm px-4 py-2 rounded-none cursor-pointer">
              JOIN AS BUYER
            </Button>
            <Button className=" text-primary bg-card-bg hover:bg-card-bg/90  text-sm px-4 py-2 rounded-none cursor-pointer">
              START SELLING
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
