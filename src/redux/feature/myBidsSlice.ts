import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BidItem, MyBidsResponse } from "@/types/allTypes";

interface MyBidsState {
  activeBids: BidItem[];
  wonBids: BidItem[];
  lostBids: BidItem[];
  currentBids: BidItem[];
  tabCounts: {
    active: number;
    won: number;
    lost: number;
  };
  total: number;
  page: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
}

const initialState: MyBidsState = {
  activeBids: [],
  wonBids: [],
  lostBids: [],
  currentBids: [],
  tabCounts: {
    active: 0,
    won: 0,
    lost: 0,
  },
  total: 0,
  page: 1,
  totalPages: 0,
  loading: false,
  error: null,
};

export const fetchMyBids = createAsyncThunk<
  MyBidsResponse & { currentBids: BidItem[]; total: number; page: number },
  { tab?: string; page?: number; limit?: number },
  { rejectValue: string }
>(
  "myBids/fetchMyBids",
  async ({ tab = "active", page = 1, limit = 10 } = {}, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams();
      params.set("tab", tab);
      params.set("page", String(page));
      params.set("limit", String(limit));

      const response = await fetch(`/api/my-bids?${params.toString()}`);

      if (!response.ok) {
        throw new Error("Failed to fetch bids");
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "An error occurred"
      );
    }
  }
);

const myBidsSlice = createSlice({
  name: "myBids",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyBids.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyBids.fulfilled, (state, action) => {
        state.loading = false;
        state.activeBids = action.payload.activeBids;
        state.wonBids = action.payload.wonBids;
        state.lostBids = action.payload.lostBids;
        state.currentBids = action.payload.currentBids;
        state.tabCounts = action.payload.tabCounts;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchMyBids.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default myBidsSlice.reducer;
