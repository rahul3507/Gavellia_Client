/** @format */
"use client";

import ProductCard from "@/components/common/ProductCard";
import { product } from "@/data/productData";
import { Filter } from "lucide-react";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

const PRODUCTS_PER_PAGE = 20;

const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("all");

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
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-primary">Browse Auction</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">Sort By:</span>
          <select className="border border-gray-300 rounded px-3 py-1 text-sm">
            <option>New Arrival</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Ending Soon</option>
          </select>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <Filter className="w-4 h-4" />
            Filters
          </Button>
        </div>
      </div>

      {/* Category Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="grid w-full grid-cols-10 bg-gray-100">
          <TabsTrigger value="all" className="text-xs">
            ALL
          </TabsTrigger>
          <TabsTrigger value="bags" className="text-xs">
            BAGS
          </TabsTrigger>
          <TabsTrigger value="art" className="text-xs">
            ART
          </TabsTrigger>
          <TabsTrigger value="watches" className="text-xs">
            WATCHES
          </TabsTrigger>
          <TabsTrigger value="cars" className="text-xs">
            CARS
          </TabsTrigger>
          <TabsTrigger value="jewellery" className="text-xs">
            JEWELLERY
          </TabsTrigger>
          <TabsTrigger value="collectibles" className="text-xs">
            COLLECTIBLES
          </TabsTrigger>
          <TabsTrigger value="fashion" className="text-xs">
            FASHION
          </TabsTrigger>
          <TabsTrigger value="shoes" className="text-xs">
            SHOES
          </TabsTrigger>
          <TabsTrigger value="more" className="text-xs">
            MORE
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
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
