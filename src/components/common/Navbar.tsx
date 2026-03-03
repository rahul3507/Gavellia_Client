/** @format */
"use client";
import {
  ChevronDown,
  Search,
  ShoppingBag,
  UserRound,
  Menu,
  X,
} from "lucide-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "../ui/button";
import AuthDialog from "./auth/AuthDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { switchToBuyer, switchToSeller } from "@/redux/feature/userRoleSlice";

const sellerNavLinks = [
  { label: "Home", href: "/" },
  { label: "Overview", href: "/overview" },
  { label: "Listings Management", href: "/listing-management" },
  { label: "Sales & Analytics", href: "/sales-analytics" },
  { label: "Messages", href: "/messages" },
];

const Navbar = () => {
  const userRole = useAppSelector((state) => state.userRole.role);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSellingSignup = () => setOpen(true);
  const handleBuyerSignup = () => setOpen(true);

  const handleSwitchToSelling = () => {
    dispatch(switchToSeller());
    router.push("/");
  };

  const handleSwitchToBuying = () => {
    dispatch(switchToBuyer());
    router.push("/");
  };

  return (
    <div className="mb-12 md:mb-3 bg-white">
      <div className="w-full px-4 sm:px-8 lg:px-16 xl:px-24 2xl:px-32">
        {userRole === "seller" ? (
          /* ── SELLER NAVBAR ── */
          <div className="relative">
            <div className=" flex items-center justify-between md:h-16 py-2 md:py-0">
              {/* Row 1 on mobile / Left on desktop: Logo + nav + burger */}
              <div className="flex items-center justify-between md:space-x-8">
                {/* Mobile only: burger icon */}
                <button
                  className="cursor-pointer md:hidden text-primary focus:outline-none mr-2"
                  onClick={() => setMobileMenuOpen((prev) => !prev)}
                  aria-label="Toggle menu"
                >
                  {mobileMenuOpen ? (
                    <X className="w-6 h-6" />
                  ) : (
                    <Menu className="w-6 h-6" />
                  )}
                </button>
                <Link
                  href="/"
                  className="text-xl md:text-4xl font-bold font-serif text-primary"
                >
                  Gavellia
                </Link>

                {/* Desktop nav links */}
                <nav className="hidden md:flex space-x-6">
                  {sellerNavLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-primary hover:text-primary/80 text-sm font-semibold"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Row 2 on mobile / Right on desktop: Profile icon + Switch to Buying */}
              <div className="flex items-center justify-center space-x-2   md:mt-0">
                <Link href="/profile-settings" aria-label="Profile settings">
                  <UserRound className="w-5 h-5 text-primary cursor-pointer hover:text-primary/80" />
                </Link>
                <Button
                  onClick={handleSwitchToBuying}
                  className="text-primary bg-card-bg hover:bg-card-bg/90 text-sm px-2 py-1 md:py-2 rounded-none cursor-pointer"
                >
                  SWITCH TO BUYING
                </Button>
              </div>
            </div>

            {/* Mobile dropdown menu — overlays page content */}
            {mobileMenuOpen && (
              <div className="md:hidden absolute top-full left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg py-2">
                {sellerNavLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block px-4 py-2 text-primary hover:bg-gray-50 text-sm font-semibold"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* ── BUYER NAVBAR ── */
          <div className="relative">
            <div className="flex items-center justify-between h-14 md:h-16">
              {/* Left: Logo */}
              <Link
                href="/"
                className="text-xl md:text-4xl font-bold font-serif text-primary"
              >
                Gavellia
              </Link>

              {/* Center nav links — hidden on mobile */}
              <nav className="hidden md:flex items-center space-x-6">
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
                      <ChevronDown className="w-4 h-4 ml-0.5 mt-0.5" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-48">
                    {[
                      "Fashion & Apparel",
                      "Electronics",
                      "Home & Living",
                      "Collectibles",
                      "Luxury Items",
                    ].map((cat) => (
                      <DropdownMenuItem key={cat} asChild>
                        <Link href="/products" className="cursor-pointer">
                          {cat}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                <a
                  href="#"
                  className="text-primary hover:text-primary/80 text-sm font-semibold"
                >
                  How it works
                </a>
              </nav>

              {/* Right: Icons + buttons */}
              <div className="flex items-center space-x-3 sm:space-x-4">
                {/* Icons group */}
                <div className="flex items-center space-x-3 sm:space-x-4 md:border-r-2 md:border-r-tertiary md:pr-4 md:py-1">
                  <Search className="w-5 h-5 text-primary cursor-pointer hover:text-primary/80" />
                  <Link href="/purchases" aria-label="Purchases">
                    <ShoppingBag className="w-5 h-5 text-primary cursor-pointer hover:text-primary/80" />
                  </Link>

                  {/* User icon with dropdown */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        className="focus:outline-none cursor-pointer"
                        aria-label="User menu"
                      >
                        <UserRound className="w-5 h-5 text-primary hover:text-primary/80" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem asChild>
                        <Link
                          href="/overviews"
                          className="cursor-pointer w-full"
                        >
                          Overviews
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/my-bids" className="cursor-pointer w-full">
                          My Bids
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link
                          href="/messages"
                          className="cursor-pointer w-full"
                        >
                          Messages
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link
                          href="/purchases"
                          className="cursor-pointer w-full"
                        >
                          Purchases
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Auth buttons + switch — hidden on mobile */}
                <div className="hidden md:flex items-center space-x-2">
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

                <Button
                  onClick={handleSwitchToSelling}
                  className="hidden md:inline-flex text-primary bg-card-bg hover:bg-card-bg/90 text-sm px-4 py-2 rounded-none cursor-pointer"
                >
                  SWITCH TO SELLING
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
