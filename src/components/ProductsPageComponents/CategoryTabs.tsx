"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { PiSlidersLight } from "react-icons/pi";

const tabs = ["all", "men", "women", "art", "watches", "cars", "jewellery", "collectibles", "fashion", "antiques", "shoes", "bags"];

interface CategoryTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  total: number;
  sortBy: string;
  onSortChange: (value: string) => void;
  onFilterOpen: () => void;
}

const CategoryTabs = ({
  activeTab,
  onTabChange,
  total,
  sortBy,
  onSortChange,
  onFilterOpen,
}: CategoryTabsProps) => {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="mb-8">
      <TabsList className="flex bg-transparent gap-1">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab}
            value={tab}
            className="text-xs border border-gray-200 rounded-none px-3 cursor-pointer data-[state=active]:border-blue-500 data-[state=active]:text-blue-500"
          >
            {tab.toUpperCase()}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value={activeTab}>
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              {total} {total === 1 ? "result" : "results"}
            </span>
            <span className="text-sm text-gray-600">Sort By:</span>
            <Select value={sortBy} onValueChange={onSortChange}>
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
              onClick={onFilterOpen}
            >
              <PiSlidersLight className="w-4 h-4" />
              Filters
            </Button>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default CategoryTabs;
