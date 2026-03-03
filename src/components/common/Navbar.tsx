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
  { label: "Messages & Inquiries", href: "/message-inquiries" },
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
      <div className="w-full px-8 sm:px-8 lg:px-16 xl:px-24 2xl:px-32">
        {userRole === "seller" ? (
          /* ── SELLER NAVBAR ── */
          <div>
            <div className="flex items-center justify-between h-16">
              {/* Left: Logo + desktop nav + mobile burger */}
              <div className="flex items-center space-x-8">
                <Link
                  href="/"
                  className="text-4xl font-bold font-serif text-primary"
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

                {/* Mobile burger icon */}
                <button
                  className="md:hidden text-primary focus:outline-none"
                  onClick={() => setMobileMenuOpen((prev) => !prev)}
                  aria-label="Toggle menu"
                >
                  {mobileMenuOpen ? (
                    <X className="w-6 h-6" />
                  ) : (
                    <Menu className="w-6 h-6" />
                  )}
                </button>
              </div>

              {/* Right: Profile icon + Switch to Buying */}
              <div className="flex items-center space-x-4">
                <Link href="/profile-settings" aria-label="Profile settings">
                  <UserRound className="w-5 h-5 text-primary cursor-pointer hover:text-primary/80" />
                </Link>
                <Button
                  onClick={handleSwitchToBuying}
                  className="text-primary bg-card-bg hover:bg-card-bg/90 text-sm px-4 py-2 rounded-none cursor-pointer"
                >
                  SWITCH TO BUYING
                </Button>
              </div>
            </div>

            {/* Mobile dropdown menu */}
            {mobileMenuOpen && (
              <div className="md:hidden bg-white border-t border-gray-200 py-2">
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
          <div className="flex flex-col md:flex-row items-center justify-between h-16 space-y-2">
            {/* Left: Logo + nav */}
            <div className="flex flex-col md:flex-row items-center space-x-8">
              <Link
                href="/"
                className="text-4xl font-bold font-serif text-primary"
              >
                Gavellia
              </Link>
              <nav className="flex space-x-6">
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
            </div>

            {/* Right: Icons + auth buttons + switch */}
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

              <Button
                onClick={handleSwitchToSelling}
                className="text-primary bg-card-bg hover:bg-card-bg/90 text-sm px-4 py-2 rounded-none cursor-pointer"
              >
                SWITCH TO SELLING
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
