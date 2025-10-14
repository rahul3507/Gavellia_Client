/** @format */
"use client";
import { ChevronDown, Search, ShoppingBag, UserRound } from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "../ui/button";
import { useState } from "react";
import AuthDialog from "./auth/AuthDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { switchToBuyer, switchToSeller } from "@/redux/feature/userRoleSlice";

const Navbar = () => {
  const userRole = useAppSelector((state) => state.userRole.role);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const handleSellingSignup = () => {
    setOpen(true);
  };

  const handleBuyerSignup = () => {
    setOpen(true);
  };

  const handleSwitchToSelling = () => {
    dispatch(switchToSeller());
    router.push("/");
  };

  const handleSwitchToBuying = () => {
    dispatch(switchToBuyer());
    router.push("/");
  };

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
                href="/products"
                className="text-primary hover:text-primary/80 text-sm font-semibold"
              >
                Browse auction
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="text-primary cursor-pointer flex hover:text-primary/80 text-sm font-semibold items-center focus:outline-none">
                    Categories{" "}
                    <ChevronDown className="w-4 h-4 ml-0.5 mt-0.5 " />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link href="/products" className="cursor-pointer">
                      Fashion & Apparel
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/products" className="cursor-pointer">
                      Electronics
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/products" className="cursor-pointer">
                      Home & Living
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/products" className="cursor-pointer">
                      Collectibles
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/products" className="cursor-pointer">
                      Luxury Items
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <a
                href="#"
                className="text-primary  hover:text-primary/80 text-sm font-semibold"
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

            <div className="flex items-center space-x-2">
              <Button
                onClick={handleBuyerSignup}
                className="bg-primary hover:bg-primary/90 text-white text-sm px-4 py-2 rounded-none cursor-pointer"
              >
                JOIN AS BUYER
              </Button>
              <Button
                className="text-primary bg-card-bg hover:bg-card-bg/90 text-sm px-4 py-2 rounded-none cursor-pointer"
                onClick={handleSellingSignup}
              >
                START SELLING
              </Button>
              <AuthDialog open={open} onOpenChange={setOpen} />
            </div>

            {/* Role Switch Buttons */}
            <div className="flex items-center space-x-2">
              {userRole === "buyer" ? (
                <Button
                  onClick={handleSwitchToSelling}
                  className=" text-primary bg-card-bg hover:bg-card-bg/90  text-sm px-4 py-2 rounded-none cursor-pointer"
                >
                  SWITCH TO SELLING
                </Button>
              ) : (
                <Button
                  onClick={handleSwitchToBuying}
                  className=" text-primary bg-card-bg hover:bg-card-bg/90  text-sm px-4 py-2 rounded-none cursor-pointer"
                >
                  SWITCH TO BUYING
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
