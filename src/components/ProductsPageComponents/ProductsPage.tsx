"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  fetchProducts,
  setFilter,
  setSortBy,
  setPage,
  clearFilters,
  toggleArrayFilter,
} from "@/redux/feature/productsSlice";
import FilterSidebar from "./FilterSidebar";
import CategoryTabs from "./CategoryTabs";
import ProductsGrid from "./ProductsGrid";
import Pagination from "./Pagination";

const ProductsPage = () => {
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
  const [activeTab, setActiveTab] = useState("all");

  const categoryFromUrl = searchParams.get("category");

  const [openSections, setOpenSections] = useState({
    auctionType: true,
    priceRange: true,
    location: true,
    categories: true,
    condition: true,
    auctionHouses: true,
  });

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

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section as keyof typeof prev] }));
  };

  const handleCategorySelect = useCallback(
    (category: string) => {
      updateFilter("category", category);
      setActiveTab(category.toLowerCase());
    },
    [updateFilter]
  );

  return (
    <div className="px-2 md:px-4 xl:px-6 relative">
      <FilterSidebar
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        openSections={openSections}
        toggleSection={toggleSection}
        updateFilter={updateFilter}
        toggleArrayFilter={toggleArrayFilterHandler}
        onClear={handleClearFilters}
        onApply={handleApplyFilters}
        onCategorySelect={handleCategorySelect}
      />

      <CategoryTabs
        activeTab={activeTab}
        onTabChange={handleTabChange}
        total={total}
        sortBy={sortBy}
        onSortChange={handleSortChange}
        onFilterOpen={() => setIsFilterOpen(true)}
      />

      <ProductsGrid
        products={products}
        loading={loading}
        onClearFilters={handleClearFilters}
      />

      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ProductsPage;
