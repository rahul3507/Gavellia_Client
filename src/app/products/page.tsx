/** @format */
"use client";

import ProductCard from "@/components/common/ProductCard";
import React, { useEffect, useState, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PiSlidersLight } from "react-icons/pi";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { CollapsibleTrigger } from "@radix-ui/react-collapsible";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  fetchProducts,
  setFilter,
  setSortBy,
  setPage,
  clearFilters,
  toggleArrayFilter,
} from "@/redux/feature/productsSlice";

const categories = [
  "ART",
  "WATCHES",
  "CARS",
  "JEWELLERY",
  "COLLECTIBLES",
  "FASHION",
  "ANTIQUES",
  "SHOES",
  "BAGS",
];

const auctionHouses = [
  "Key Date Coins",
  "Gold Standard Auction",
  "Timeline Auctions Limited",
  "Auction at Showplace",
  "Richard L. Edwards Auctioneering",
  "Kubli Haus",
  "Prestige Auction House",
  "Heritage Auctions",
  "Bonhams",
  "Christie's",
  "Sotheby's",
];

const ProductsContent = () => {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const router = useRouter();
  const {
    products,
    total,
    page,
    totalPages,
    loading,
    filters,
    sortBy,
  } = useAppSelector((state) => state.products);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  const categoryFromUrl = searchParams.get("category");

  useEffect(() => {
    if (categoryFromUrl) {
      dispatch(setFilter({ key: "category", value: categoryFromUrl.toUpperCase() }));
      setActiveTab(categoryFromUrl.toLowerCase());
    }
  }, [categoryFromUrl, dispatch]);

  useEffect(() => {
    dispatch(fetchProducts({ page, limit: 20 }));
  }, [dispatch, page, filters, sortBy]);

  const handleTabChange = useCallback(
    (value: string) => {
      setActiveTab(value);
      const category = value === "all" ? "ALL" : value.toUpperCase();
      dispatch(setFilter({ key: "category", value: category }));
      dispatch(setPage(1));
      const params = new URLSearchParams(searchParams.toString());
      if (value === "all") {
        params.delete("category");
      } else {
        params.set("category", value);
      }
      router.push(`/products?${params.toString()}`);
    },
    [dispatch, router, searchParams]
  );

  const handleSortChange = useCallback(
    (value: string) => {
      dispatch(setSortBy(value));
      dispatch(setPage(1));
    },
    [dispatch]
  );

  const handlePageChange = useCallback(
    (newPage: number) => {
      dispatch(setPage(newPage));
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [dispatch]
  );

  const handleApplyFilters = useCallback(() => {
    dispatch(setPage(1));
    dispatch(fetchProducts({ page: 1, limit: 20 }));
    setIsFilterOpen(false);
  }, [dispatch]);

  const handleClearFilters = useCallback(() => {
    dispatch(clearFilters());
    dispatch(setPage(1));
    setActiveTab("all");
    router.push("/products");
  }, [dispatch, router]);

  const updateFilter = useCallback(
    (key: string, value: string | number[] | string[]) => {
      dispatch(setFilter({ key, value }));
    },
    [dispatch]
  );

  const toggleArrayFilterHandler = useCallback(
    (key: "condition" | "auctionHouses", value: string) => {
      dispatch(toggleArrayFilter({ key, value }));
    },
    [dispatch]
  );

  const [openSections, setOpenSections] = useState({
    auctionType: true,
    priceRange: true,
    location: true,
    categories: true,
    condition: true,
    auctionHouses: true,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (page > 3) pages.push("...");
      const start = Math.max(2, page - 1);
      const end = Math.min(totalPages - 1, page + 1);
      for (let i = start; i <= end; i++) {
        if (i !== 1 && i !== totalPages) pages.push(i);
      }
      if (page < totalPages - 2) pages.push("...");
      if (totalPages > 1) pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="px-2 md:px-4 xl:px-6 relative">
      {/* Filter Sidebar Overlay */}
      {isFilterOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={() => setIsFilterOpen(false)}
        />
      )}

      {/* Filter Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          isFilterOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <ScrollArea className="h-full w-full px-6">
          <div className="pt-4 px-0">
            <div className="flex justify-between items-center mb-0">
              <h2 className="text-lg font-semibold">Filters</h2>
              <Button
                onClick={() => setIsFilterOpen(false)}
                className="text-gray-500 hover:text-gray-700 bg-white"
              >
                ✕
              </Button>
            </div>
          </div>

          {/* Auction Type */}
          <Collapsible
            open={openSections.auctionType}
            onOpenChange={() => toggleSection("auctionType")}
          >
            <CollapsibleTrigger className="flex items-center justify-between w-full py-3 cursor-pointer">
              <span className="text-xs font-medium text-primary/50 uppercase tracking-wide">
                AUCTION TYPE
              </span>
              {openSections.auctionType ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-0 pb-4 text-primary">
              <RadioGroup
                value={filters.auctionType}
                onValueChange={(value) => updateFilter("auctionType", value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="all" id="all-type" className="cursor-pointer" />
                  <Label htmlFor="all-type" className="text-sm font-normal">All</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="live" id="live" className="cursor-pointer" />
                  <Label htmlFor="live" className="text-sm font-normal">LIVE</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="upcoming" id="upcoming" className="cursor-pointer" />
                  <Label htmlFor="upcoming" className="text-sm font-normal">Upcoming</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="timed" id="timed" className="cursor-pointer" />
                  <Label htmlFor="timed" className="text-sm font-normal">Timed</Label>
                </div>
              </RadioGroup>
            </CollapsibleContent>
          </Collapsible>

          {/* Price Range */}
          <Collapsible
            open={openSections.priceRange}
            onOpenChange={() => toggleSection("priceRange")}
          >
            <CollapsibleTrigger className="flex items-center justify-between w-full py-3 border-t border-gray-100 cursor-pointer">
              <span className="text-xs font-medium text-primary/50 uppercase tracking-wide">
                PRICE RANGE
              </span>
              {openSections.priceRange ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-4 pb-4">
              <div className="text-center">
                <span className="text-lg font-semibold">
                  £ {filters.priceRange[0].toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>Min £0</span>
                <Slider
                  value={filters.priceRange}
                  onValueChange={(value) => updateFilter("priceRange", value)}
                  max={10000}
                  min={0}
                  step={50}
                  className="w-36"
                />
                <span>£10k Max</span>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Location */}
          <Collapsible
            open={openSections.location}
            onOpenChange={() => toggleSection("location")}
          >
            <CollapsibleTrigger className="flex items-center justify-between w-full py-3 border-t border-gray-100 cursor-pointer">
              <span className="text-xs font-medium text-primary/50 uppercase tracking-wide">
                LOCATION
              </span>
              {openSections.location ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </CollapsibleTrigger>
            <CollapsibleContent className="pb-4">
              <Select
                value={filters.location}
                onValueChange={(value) => updateFilter("location", value)}
              >
                <SelectTrigger className="w-full cursor-pointer">
                  <SelectValue placeholder="Select a location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="all" className="cursor-pointer">
                      <span>All Locations</span>
                    </SelectItem>
                    <SelectItem value="usa" className="cursor-pointer">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-3 bg-red-500 relative rounded-full overflow-hidden">
                          <Image
                            src="/united-states.png"
                            alt="USA Flag"
                            className="w-full h-full object-cover"
                            width={500}
                            height={500}
                          />
                        </div>
                        <span>USA</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="uk" className="cursor-pointer">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-3 bg-red-500 relative rounded-full overflow-hidden">
                          <Image
                            src="/united-kingdom.png"
                            alt="UK Flag"
                            className="w-full h-full object-cover"
                            width={500}
                            height={500}
                          />
                        </div>
                        <span>UK</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="europe" className="cursor-pointer">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-3 bg-red-500 relative rounded-full overflow-hidden">
                          <Image
                            src="/european-union.png"
                            alt="EU Flag"
                            className="w-full h-full object-cover"
                            width={500}
                            height={500}
                          />
                        </div>
                        <span>Europe</span>
                      </div>
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </CollapsibleContent>
          </Collapsible>

          {/* Categories */}
          <Collapsible
            open={openSections.categories}
            onOpenChange={() => toggleSection("categories")}
          >
            <CollapsibleTrigger className="flex items-center justify-between w-full py-3 border-t border-gray-100 cursor-pointer">
              <span className="text-xs font-medium text-primary/50 uppercase tracking-wide">
                CATEGORIES
              </span>
              {openSections.categories ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-3 pb-4">
              <div className="flex flex-wrap gap-2">
                {(showAllCategories ? categories : categories.slice(0, 7)).map(
                  (category) => (
                    <Button
                      key={category}
                      variant={
                        filters.category === category ? "default" : "outline"
                      }
                      size="sm"
                      className="text-xs h-8 rounded-none"
                      onClick={() => {
                        updateFilter("category", category);
                        setActiveTab(category.toLowerCase());
                      }}
                    >
                      {category}
                    </Button>
                  )
                )}
              </div>
              <Button
                variant="link"
                className="text-sm p-0 h-auto font-normal underline cursor-pointer"
                onClick={() => setShowAllCategories(!showAllCategories)}
              >
                {showAllCategories
                  ? "SHOW LESS"
                  : `VIEW ALL ${categories.length} CATEGORIES`}
              </Button>
            </CollapsibleContent>
          </Collapsible>

          {/* Condition */}
          <Collapsible
            open={openSections.condition}
            onOpenChange={() => toggleSection("condition")}
          >
            <CollapsibleTrigger className="flex items-center justify-between w-full py-3 border-t border-gray-100 cursor-pointer">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                CONDITION
              </span>
              {openSections.condition ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-3 pb-6">
              {["new", "used", "restored", "forparts"].map((condition) => (
                <div key={condition} className="flex items-center space-x-2">
                  <Checkbox
                    id={condition}
                    checked={filters.condition.includes(condition)}
                    onCheckedChange={() =>
                      toggleArrayFilterHandler("condition", condition)
                    }
                  />
                  <Label htmlFor={condition} className="text-sm font-normal capitalize">
                    {condition === "forparts" ? "For Parts" : condition}
                  </Label>
                </div>
              ))}
            </CollapsibleContent>
          </Collapsible>

          {/* Auction Houses */}
          <Collapsible
            open={openSections.auctionHouses}
            onOpenChange={() => toggleSection("auctionHouses")}
          >
            <CollapsibleTrigger className="flex items-center justify-between w-full py-3 border-t border-gray-100 cursor-pointer">
              <span className="text-xs font-medium text-primary/50 uppercase tracking-wide">
                AUCTION HOUSES
              </span>
              {openSections.auctionHouses ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2 pb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="SEARCH"
                  value={filters.searchQuery}
                  onChange={(e) => updateFilter("searchQuery", e.target.value)}
                  className="pl-10 text-sm"
                />
              </div>
              <div className="space-y-2">
                {auctionHouses.map((house) => (
                  <div key={house} className="flex items-center space-x-2">
                    <Checkbox
                      id={house.toLowerCase().replace(/\s+/g, "")}
                      checked={filters.auctionHouses.includes(house)}
                      onCheckedChange={() =>
                        toggleArrayFilterHandler("auctionHouses", house)
                      }
                    />
                    <Label
                      htmlFor={house.toLowerCase().replace(/\s+/g, "")}
                      className="text-sm font-normal"
                    >
                      {house}
                    </Label>
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Filter Actions */}
          <div className="flex space-x-3 mb-16 mt-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={handleClearFilters}
            >
              Clear All
            </Button>
            <Button
              className="flex-1 bg-primary hover:bg-primary/90"
              onClick={handleApplyFilters}
            >
              Apply Filters
            </Button>
          </div>
        </ScrollArea>
      </div>

      {/* Category Tabs */}
      <Tabs value={activeTab} onValueChange={handleTabChange} className="mb-8">
        <TabsList className="flex bg-transparent gap-1">
          {["all", "men", "women", "art", "watches", "cars", "jewellery", "collectibles", "fashion", "antiques", "shoes", "bags"].map(
            (tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="text-xs border border-gray-200 rounded-none px-3 cursor-pointer data-[state=active]:border-blue-500 data-[state=active]:text-blue-500"
              >
                {tab.toUpperCase()}
              </TabsTrigger>
            )
          )}
        </TabsList>

        <TabsContent value={activeTab}>
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                {total} {total === 1 ? "result" : "results"}
              </span>
              <span className="text-sm text-gray-600">Sort By:</span>
              <Select value={sortBy} onValueChange={handleSortChange}>
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
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-8">
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 h-[300px] rounded" />
                  <div className="p-4 space-y-2">
                    <div className="bg-gray-200 h-4 rounded w-3/4" />
                    <div className="bg-gray-200 h-3 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">No products found matching your filters.</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={handleClearFilters}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-8">
              {products.map((productItem) => (
                <ProductCard key={productItem.id} productData={productItem} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(Math.max(1, page - 1))}
                disabled={page === 1}
                className="px-3 py-1"
              >
                PREVIOUS
              </Button>

              {getPageNumbers().map((pageNum, index) => (
                <React.Fragment key={index}>
                  {pageNum === "..." ? (
                    <span className="px-2 py-1 text-gray-500">...</span>
                  ) : (
                    <Button
                      variant={page === pageNum ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePageChange(pageNum as number)}
                      className={`px-3 py-1 ${
                        page === pageNum
                          ? "bg-primary text-white"
                          : "text-gray-700"
                      }`}
                    >
                      {pageNum}
                    </Button>
                  )}
                </React.Fragment>
              ))}

              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
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

const Products = () => {
  return (
    <Suspense fallback={<div className="px-2 md:px-4 xl:px-6">Loading...</div>}>
      <ProductsContent />
    </Suspense>
  );
};

export default Products;
