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

  return (
    <div className="px-2 md:px-4 xl:px-6 relative">
      {/* Filter Sidebar Overlay */}
      {isFilterOpen && (
        <div
          className="fixed inset-0 bg-black/30  z-40"
          onClick={() => setIsFilterOpen(false)}
        />
      )}

      {/* Filter Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
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

          {/* Price Range Filter */}
          <div className="mb-6">
            <h3 className="font-medium mb-3">Price Range</h3>
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm">Under £100</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm">£100 - £500</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm">£500 - £1000</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm">Over £1000</span>
              </label>
            </div>
          </div>

          {/* Condition Filter */}
          <div className="mb-6">
            <h3 className="font-medium mb-3">Condition</h3>
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm">New</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm">Like New</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm">Very Good</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm">Good</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm">Fair</span>
              </label>
            </div>
          </div>

          {/* Time Left Filter */}
          <div className="mb-6">
            <h3 className="font-medium mb-3">Time Left</h3>
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm">Ending Today</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm">Ending This Week</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm">More Than 1 Week</span>
              </label>
            </div>
          </div>

          {/* Brand Filter */}
          <div className="mb-6">
            <h3 className="font-medium mb-3">Brand</h3>
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm">Louis Vuitton</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm">Rolex</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm">Apple</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm">Nike</span>
              </label>
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
