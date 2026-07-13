"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  filters: {
    auctionType: string;
    priceRange: number[];
    location: string;
    category: string;
    condition: string[];
    auctionHouses: string[];
    searchQuery: string;
  };
  openSections: {
    auctionType: boolean;
    priceRange: boolean;
    location: boolean;
    categories: boolean;
    condition: boolean;
    auctionHouses: boolean;
  };
  toggleSection: (section: string) => void;
  updateFilter: (key: string, value: string | number[] | string[]) => void;
  toggleArrayFilter: (key: "condition" | "auctionHouses", value: string) => void;
  onClear: () => void;
  onApply: () => void;
  onCategorySelect: (category: string) => void;
}

const FilterSidebar = ({
  isOpen,
  onClose,
  filters,
  openSections,
  toggleSection,
  updateFilter,
  toggleArrayFilter,
  onClear,
  onApply,
  onCategorySelect,
}: FilterSidebarProps) => {
  const [showAllCategories, setShowAllCategories] = React.useState(false);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <ScrollArea className="h-full w-full px-6">
          <div className="pt-4 px-0">
            <div className="flex justify-between items-center mb-0">
              <h2 className="text-lg font-semibold">Filters</h2>
              <Button
                onClick={onClose}
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
                      onClick={() => onCategorySelect(category)}
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
                      toggleArrayFilter("condition", condition)
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
                        toggleArrayFilter("auctionHouses", house)
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
              onClick={onClear}
            >
              Clear All
            </Button>
            <Button
              className="flex-1 bg-primary hover:bg-primary/90"
              onClick={onApply}
            >
              Apply Filters
            </Button>
          </div>
        </ScrollArea>
      </div>
    </>
  );
};

export default FilterSidebar;
