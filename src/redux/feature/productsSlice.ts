import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ProductData, ProductsResponse } from "@/types/allTypes";

interface ProductsState {
  products: ProductData[];
  total: number;
  page: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
  filters: {
    category: string;
    auctionType: string;
    priceRange: number[];
    location: string;
    condition: string[];
    auctionHouses: string[];
    searchQuery: string;
  };
  sortBy: string;
  selectedProduct: ProductData | null;
  relatedProducts: ProductData[];
  productLoading: boolean;
}

const initialState: ProductsState = {
  products: [],
  total: 0,
  page: 1,
  totalPages: 0,
  loading: false,
  error: null,
  filters: {
    category: "ALL",
    auctionType: "all",
    priceRange: [10000],
    location: "all",
    condition: [],
    auctionHouses: [],
    searchQuery: "",
  },
  sortBy: "new-arrival",
  selectedProduct: null,
  relatedProducts: [],
  productLoading: false,
};

export const fetchProducts = createAsyncThunk<
  ProductsResponse,
  { page?: number; limit?: number },
  { state: { products: ProductsState } }
>(
  "products/fetchProducts",
  async ({ page = 1, limit = 20 }, { getState, rejectWithValue }) => {
    try {
      const { filters, sortBy } = getState().products;
      const params = new URLSearchParams();

      params.set("page", String(page));
      params.set("limit", String(limit));

      if (filters.category && filters.category !== "ALL") {
        params.set("category", filters.category);
      }
      if (filters.auctionType && filters.auctionType !== "all") {
        params.set("auctionType", filters.auctionType);
      }
      if (filters.priceRange[0] < 10000) {
        params.set("priceMax", String(filters.priceRange[0]));
      }
      if (filters.location && filters.location !== "all") {
        params.set("location", filters.location);
      }
      if (filters.condition.length > 0) {
        params.set("condition", filters.condition.join(","));
      }
      if (filters.auctionHouses.length > 0) {
        params.set("auctionHouses", filters.auctionHouses.join(","));
      }
      if (filters.searchQuery) {
        params.set("search", filters.searchQuery);
      }
      if (sortBy) {
        params.set("sortBy", sortBy);
      }

      const response = await fetch(`/api/products?${params.toString()}`);

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "An error occurred"
      );
    }
  }
);

export const fetchProductById = createAsyncThunk<
  { product: ProductData; relatedProducts: ProductData[] },
  string,
  { rejectValue: string }
>(
  "products/fetchProductById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/products/${encodeURIComponent(id)}`);

      if (!response.ok) {
        throw new Error("Product not found");
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "An error occurred"
      );
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setFilter: (
      state,
      action: PayloadAction<{
        key: string;
        value: string | number[] | string[];
      }>
    ) => {
      const { key, value } = action.payload;
      (state.filters as Record<string, unknown>)[key] = value;
    },
    setSortBy: (state, action: PayloadAction<string>) => {
      state.sortBy = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
      state.sortBy = initialState.sortBy;
    },
    toggleArrayFilter: (
      state,
      action: PayloadAction<{ key: "condition" | "auctionHouses"; value: string }>
    ) => {
      const { key, value } = action.payload;
      const arr = state.filters[key] as string[];
      const index = arr.indexOf(value);
      if (index > -1) {
        arr.splice(index, 1);
      } else {
        arr.push(value);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchProductById.pending, (state) => {
        state.productLoading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.productLoading = false;
        state.selectedProduct = action.payload.product;
        state.relatedProducts = action.payload.relatedProducts;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.productLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setFilter,
  setSortBy,
  setPage,
  clearFilters,
  toggleArrayFilter,
} = productsSlice.actions;

export default productsSlice.reducer;
