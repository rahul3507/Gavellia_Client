import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Listing, ListingDetail, ListingsResponse, ListingDetailResponse } from "@/types/allTypes";

interface ListingsState {
  listings: Listing[];
  allListings: Listing[];
  selectedListing: ListingDetail | null;
  tabCounts: {
    timed: number;
    live: number;
    sold: number;
    draft: number;
  };
  loading: boolean;
  detailLoading: boolean;
  error: string | null;
}

const initialState: ListingsState = {
  listings: [],
  allListings: [],
  selectedListing: null,
  tabCounts: {
    timed: 0,
    live: 0,
    sold: 0,
    draft: 0,
  },
  loading: false,
  detailLoading: false,
  error: null,
};

export const fetchListings = createAsyncThunk<
  ListingsResponse & { allListings: Listing[] },
  { tab?: string },
  { rejectValue: string }
>(
  "listings/fetchListings",
  async ({ tab = "timed" } = {}, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams();
      params.set("tab", tab);

      const response = await fetch(`/api/listings?${params.toString()}`);

      if (!response.ok) {
        throw new Error("Failed to fetch listings");
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "An error occurred"
      );
    }
  }
);

export const fetchListingDetail = createAsyncThunk<
  ListingDetailResponse,
  string,
  { rejectValue: string }
>(
  "listings/fetchListingDetail",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/listings?id=${encodeURIComponent(id)}`);

      if (!response.ok) {
        throw new Error("Listing not found");
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "An error occurred"
      );
    }
  }
);

const listingsSlice = createSlice({
  name: "listings",
  initialState,
  reducers: {
    clearSelectedListing: (state) => {
      state.selectedListing = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchListings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchListings.fulfilled, (state, action) => {
        state.loading = false;
        state.listings = action.payload.listings;
        state.allListings = action.payload.allListings;
        state.tabCounts = action.payload.tabCounts;
      })
      .addCase(fetchListings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchListingDetail.pending, (state) => {
        state.detailLoading = true;
        state.error = null;
      })
      .addCase(fetchListingDetail.fulfilled, (state, action) => {
        state.detailLoading = false;
        state.selectedListing = action.payload.listing;
      })
      .addCase(fetchListingDetail.rejected, (state, action) => {
        state.detailLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearSelectedListing } = listingsSlice.actions;
export default listingsSlice.reducer;
