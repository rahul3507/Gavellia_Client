import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PurchaseItem, PurchasesResponse } from "@/types/allTypes";

interface PurchasesState {
  toPay: PurchaseItem[];
  toShip: PurchaseItem[];
  inTransit: PurchaseItem[];
  completed: PurchaseItem[];
  currentItems: PurchaseItem[];
  tabCounts: {
    toPay: number;
    toShip: number;
    inTransit: number;
    completed: number;
  };
  loading: boolean;
  error: string | null;
}

const initialState: PurchasesState = {
  toPay: [],
  toShip: [],
  inTransit: [],
  completed: [],
  currentItems: [],
  tabCounts: {
    toPay: 0,
    toShip: 0,
    inTransit: 0,
    completed: 0,
  },
  loading: false,
  error: null,
};

export const fetchPurchases = createAsyncThunk<
  PurchasesResponse,
  void,
  { rejectValue: string }
>(
  "purchases/fetchPurchases",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/purchases");

      if (!response.ok) {
        throw new Error("Failed to fetch purchases");
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "An error occurred"
      );
    }
  }
);

const purchasesSlice = createSlice({
  name: "purchases",
  initialState,
  reducers: {
    setCurrentTab: (state, action) => {
      const tab = action.payload;
      const tabMap: Record<string, PurchaseItem[]> = {
        "to-pay": state.toPay,
        "to-ship": state.toShip,
        "in-transit": state.inTransit,
        completed: state.completed,
      };
      state.currentItems = tabMap[tab] || [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPurchases.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPurchases.fulfilled, (state, action) => {
        state.loading = false;
        state.toPay = action.payload.toPay;
        state.toShip = action.payload.toShip;
        state.inTransit = action.payload.inTransit;
        state.completed = action.payload.completed;
        state.tabCounts = action.payload.tabCounts;
        state.currentItems = action.payload.toPay;
      })
      .addCase(fetchPurchases.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setCurrentTab } = purchasesSlice.actions;
export default purchasesSlice.reducer;
