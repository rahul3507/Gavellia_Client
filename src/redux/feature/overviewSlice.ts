import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  OverviewStats,
  InspiredByBidProduct,
  LiveAuctionItem,
  RecentActivityItem,
  OverviewResponse,
} from "@/types/allTypes";

interface OverviewState {
  stats: OverviewStats;
  inspiredByBids: InspiredByBidProduct[];
  liveAuctionStartingSoon: LiveAuctionItem[];
  recentActivity: RecentActivityItem[];
  loading: boolean;
  error: string | null;
}

const initialState: OverviewState = {
  stats: {
    currentlyBidding: 0,
    saved: 0,
    needsPayment: 0,
    spent: 0,
  },
  inspiredByBids: [],
  liveAuctionStartingSoon: [],
  recentActivity: [],
  loading: false,
  error: null,
};

export const fetchOverview = createAsyncThunk<
  OverviewResponse,
  void,
  { rejectValue: string }
>(
  "overview/fetchOverview",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/overview");

      if (!response.ok) {
        throw new Error("Failed to fetch overview data");
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "An error occurred"
      );
    }
  }
);

const overviewSlice = createSlice({
  name: "overview",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOverview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOverview.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload.stats;
        state.inspiredByBids = action.payload.inspiredByBids;
        state.liveAuctionStartingSoon = action.payload.liveAuctionStartingSoon;
        state.recentActivity = action.payload.recentActivity;
      })
      .addCase(fetchOverview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default overviewSlice.reducer;
