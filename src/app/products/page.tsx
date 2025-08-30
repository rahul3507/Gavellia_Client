/** @format */
"use client";

import ProductCard from "@/components/common/ProductCard";
import { product } from "@/data/productData";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PiSlidersLight } from "react-icons/pi";
import { Search } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { FilterState } from "@/types/allTypes";

const categories = [
  "ART",
  "WATCHES",
  "CARS",
  "JEWELLERY",
  "COLLECTIBLES",
  "FASHION",
  "ANTIQUES",
];

const auctionHouses = [
  "Key Date Coins",
  "Gold Standard Auction",
  "Timeline Auctions Limited",
  "Auction at Showplace",
  "Richard L. Edwards Auctioneering",
];

const PRODUCTS_PER_PAGE = 20;

const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("all");
  const [sortBy, setSortBy] = useState("new-arrival");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Filter products based on active tab
  const getFilteredProducts = () => {
    // For now, return all products. You can add filtering logic here later
    return product;
  };

  const filteredProducts = getFilteredProducts();
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

  // Get products for current page
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        if (i !== 1 && i !== totalPages) {
          pages.push(i);
        }
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      // Always show last page
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const [filters, setFilters] = useState<FilterState>({
    auctionType: "timed",
    priceRange: [700],
    location: "usa",
    categories: [],
    condition: ["restored"],
    auctionHouses: ["Timeline Auctions Limited"],
    searchQuery: "",
  });

  const updateFilter = <K extends keyof FilterState>(
    key: K,
    value: FilterState[K]
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const toggleArrayFilter = (
    key: "categories" | "condition" | "auctionHouses",
    value: string
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((item) => item !== value)
        : [...prev[key], value],
    }));
  };

  return (
    <div className="px-2 md:px-4 xl:px-6 relative">
      {/* Filter Sidebar Overlay */}
      {isFilterOpen && (
        <div
          className=" inset-0 bg-black/30  z-40"
          onClick={() => setIsFilterOpen(false)}
        />
      )}

      {/* Filter Sidebar */}
      <div
        className={`fixed px-6 top-0 right-0 h-full w-80 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          isFilterOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6">
          {/* Filter Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Filters</h2>
            <Button
              onClick={() => setIsFilterOpen(false)}
              className="text-gray-500 hover:text-gray-700 bg-white"
            >
              ✕
            </Button>
          </div>

          <div className="py-3">
            <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
              AUCTION TYPE
            </span>
          </div>
          <div className="space-y-3">
            <RadioGroup
              value={filters.auctionType}
              onValueChange={(value) => updateFilter("auctionType", value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="live" id="live" />
                <Label htmlFor="live" className="text-sm font-medium">
                  LIVE
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="upcoming" id="upcoming" />
                <Label htmlFor="upcoming" className="text-sm font-medium">
                  Upcoming
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="timed" id="timed" />
                <Label htmlFor="timed" className="text-sm font-medium">
                  Timed
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="buynow" id="buynow" />
                <Label htmlFor="buynow" className="text-sm font-medium">
                  Buy Now
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        {/* Price Range */}
        <div className="pb-6 border-t border-gray-100">
          <div className="py-3">
            <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
              PRICE RANGE
            </span>
          </div>
          <div className="space-y-4">
            <div className="text-center">
              <span className="text-lg font-semibold">
                £ {filters.priceRange[0]}
              </span>
            </div>
            <Slider
              value={filters.priceRange}
              onValueChange={(value) => updateFilter("priceRange", value)}
              max={10000}
              min={0}
              step={50}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>Min £0</span>
              <span>£10k Max</span>
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="pb-6 border-t border-gray-100">
          <div className="py-3">
            <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
              LOCATION
            </span>
          </div>
          <Select
            value={filters.location}
            onValueChange={(value) => updateFilter("location", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-3 bg-red-500 relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-red-500 via-white to-red-500 bg-[length:100%_20%] bg-repeat-y"></div>
                    <div className="absolute top-0 left-0 w-2 h-2 bg-blue-600"></div>
                  </div>
                  <span>USA</span>
                </div>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="usa">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-3 bg-red-500 relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-red-500 via-white to-red-500 bg-[length:100%_20%] bg-repeat-y"></div>
                    <div className="absolute top-0 left-0 w-2 h-2 bg-blue-600"></div>
                  </div>
                  <span>USA</span>
                </div>
              </SelectItem>
              <SelectItem value="uk">UK</SelectItem>
              <SelectItem value="eu">Europe</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Categories */}
        <div className="pb-6 border-t border-gray-100">
          <div className="py-3">
            <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
              CATEGORIES
            </span>
          </div>
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={
                    filters.categories.includes(category)
                      ? "default"
                      : "outline"
                  }
                  size="sm"
                  className="text-xs h-8"
                  onClick={() => toggleArrayFilter("categories", category)}
                >
                  {category}
                </Button>
              ))}
            </div>
            <Button
              variant="link"
              className="text-sm p-0 h-auto font-normal underline"
            >
              VIEW ALL 12 CATEGORIES
            </Button>
          </div>
        </div>

        {/* Condition */}
        <div className="pb-6 border-t border-gray-100">
          <div className="py-3">
            <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
              CONDITION
            </span>
          </div>
          <div className="space-y-3">
            {["New", "Used", "Restored", "For Parts"].map((condition) => (
              <div key={condition} className="flex items-center space-x-2">
                <Checkbox
                  id={condition.toLowerCase().replace(" ", "")}
                  checked={filters.condition.includes(
                    condition.toLowerCase().replace(" ", "")
                  )}
                  onCheckedChange={() =>
                    toggleArrayFilter(
                      "condition",
                      condition.toLowerCase().replace(" ", "")
                    )
                  }
                />
                <Label
                  htmlFor={condition.toLowerCase().replace(" ", "")}
                  className="text-sm font-medium"
                >
                  {condition}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Auction Houses */}
        <div className="pb-6 border-t border-gray-100">
          <div className="py-3">
            <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
              AUCTION HOUSES
            </span>
          </div>
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="SEARCH"
                value={filters.searchQuery}
                onChange={(e) => updateFilter("searchQuery", e.target.value)}
                className="pl-10 text-sm"
              />
            </div>
            <div className="space-y-3">
              {auctionHouses.map((house) => (
                <div key={house} className="flex items-center space-x-2">
                  <Checkbox
                    id={house.toLowerCase().replace(/\s+/g, "")}
                    checked={filters.auctionHouses.includes(house)}
                    onCheckedChange={() =>
                      toggleArrayFilter("auctionHouses", house)
                    }
                  />
                  <Label
                    htmlFor={house.toLowerCase().replace(/\s+/g, "")}
                    className="text-sm font-medium"
                  >
                    {house}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Filter Actions */}
        <div className="flex space-x-3 mt-8">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => setIsFilterOpen(false)}
          >
            Clear All
          </Button>
          <Button
            className="flex-1 bg-primary hover:bg-primary/90"
            onClick={() => setIsFilterOpen(false)}
          >
            Apply Filters
          </Button>
        </div>
      </div>

      {/* Header */}

      {/* Category Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8 ">
        <TabsList className="flex bg-transparent gap-1 ">
          <TabsTrigger
            value="all"
            className="text-xs border border-gray-200 rounded-none px-3 cursor-pointer data-[state=active]:border-blue-500 data-[state=active]:text-blue-500"
          >
            ALL
          </TabsTrigger>
          <TabsTrigger
            value="men"
            className="text-xs border border-gray-200 rounded-none px-3 cursor-pointer data-[state=active]:border-blue-500 data-[state=active]:text-blue-500"
          >
            MEN
          </TabsTrigger>
          <TabsTrigger
            value="women"
            className="text-xs border border-gray-200 rounded-none px-3 cursor-pointer data-[state=active]:border-blue-500 data-[state=active]:text-blue-500"
          >
            WOMEN
          </TabsTrigger>

          <TabsTrigger
            value="art"
            className="text-xs border border-gray-200 rounded-none px-3 cursor-pointer data-[state=active]:border-blue-500 data-[state=active]:text-blue-500"
          >
            ART
          </TabsTrigger>
          <TabsTrigger
            value="watches"
            className="text-xs border border-gray-200 rounded-none px-3 cursor-pointer data-[state=active]:border-blue-500 data-[state=active]:text-blue-500"
          >
            WATCHES
          </TabsTrigger>
          <TabsTrigger
            value="cars"
            className="text-xs border border-gray-200 rounded-none px-3 cursor-pointer data-[state=active]:border-blue-500 data-[state=active]:text-blue-500"
          >
            CARS
          </TabsTrigger>
          <TabsTrigger
            value="jewellery"
            className="text-xs border border-gray-200 rounded-none px-3 cursor-pointer data-[state=active]:border-blue-500 data-[state=active]:text-blue-500"
          >
            JEWELLERY
          </TabsTrigger>
          <TabsTrigger
            value="collectibles"
            className="text-xs border border-gray-200 rounded-none px-3 cursor-pointer data-[state=active]:border-blue-500 data-[state=active]:text-blue-500"
          >
            COLLECTIBLES
          </TabsTrigger>
          <TabsTrigger
            value="fashion"
            className="text-xs border border-gray-200 rounded-none px-3 cursor-pointer data-[state=active]:border-blue-500 data-[state=active]:text-blue-500"
          >
            FASHION
          </TabsTrigger>
          <TabsTrigger
            value="antiques"
            className="text-xs border border-gray-200 rounded-none px-3 cursor-pointer data-[state=active]:border-blue-500 data-[state=active]:text-blue-500"
          >
            ANTIQUES
          </TabsTrigger>
          <TabsTrigger
            value="shoes"
            className="text-xs border border-gray-200 rounded-none px-3 cursor-pointer data-[state=active]:border-blue-500 data-[state=active]:text-blue-500"
          >
            SHOES
          </TabsTrigger>
          <TabsTrigger
            value="bags"
            className="text-xs border border-gray-200 rounded-none px-3 cursor-pointer data-[state=active]:border-blue-500 data-[state=active]:text-blue-500"
          >
            BAGS
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Sort By:</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48 text-sm cursor-pointer">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new-arrival" className="cursor-pointer">
                    New Arrival
                  </SelectItem>
                  <SelectItem value="price-low-high" className="cursor-pointer">
                    Price: Low to High
                  </SelectItem>
                  <SelectItem value="price-high-low" className="cursor-pointer">
                    Price: High to Low
                  </SelectItem>
                  <SelectItem value="ending-soon" className="cursor-pointer">
                    Ending Soon
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2 border-none focus:ring-0 focus:ring-offset-0 shadow-none"
                onClick={() => setIsFilterOpen(true)}
              >
                <PiSlidersLight className="w-4 h-4" />
                Filters
              </Button>
            </div>
          </div>
          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-8">
            {currentProducts.map((productItem, index) => (
              <ProductCard key={startIndex + index} productData={productItem} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              {/* Previous Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1"
              >
                PREVIOUS
              </Button>

              {/* Page Numbers */}
              {getPageNumbers().map((page, index) => (
                <React.Fragment key={index}>
                  {page === "..." ? (
                    <span className="px-2 py-1 text-gray-500">...</span>
                  ) : (
                    <Button
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page as number)}
                      className={`px-3 py-1 ${
                        currentPage === page
                          ? "bg-primary text-white"
                          : "text-gray-700"
                      }`}
                    >
                      {page}
                    </Button>
                  )}
                </React.Fragment>
              ))}

              {/* Next Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
                className="px-3 py-1"
              >
                NEXT
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Products;
