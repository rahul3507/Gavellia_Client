/** @format */

import { configureStore } from "@reduxjs/toolkit";
import userRoleReducer from "./feature/userRoleSlice";
import productsReducer from "./feature/productsSlice";
import overviewReducer from "./feature/overviewSlice";
import myBidsReducer from "./feature/myBidsSlice";
import purchasesReducer from "./feature/purchasesSlice";

export const store = configureStore({
  reducer: {
    userRole: userRoleReducer,
    products: productsReducer,
    overview: overviewReducer,
    myBids: myBidsReducer,
    purchases: purchasesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
