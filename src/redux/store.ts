/** @format */

import { configureStore } from "@reduxjs/toolkit";
import userRoleReducer from "./feature/userRoleSlice";
import productsReducer from "./feature/productsSlice";
import overviewReducer from "./feature/overviewSlice";
import myBidsReducer from "./feature/myBidsSlice";
import purchasesReducer from "./feature/purchasesSlice";
import listingsReducer from "./feature/listingsSlice";

export const store = configureStore({
  reducer: {
    userRole: userRoleReducer,
    products: productsReducer,
    overview: overviewReducer,
    myBids: myBidsReducer,
    purchases: purchasesReducer,
    listings: listingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
