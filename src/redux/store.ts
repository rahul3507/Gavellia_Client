/** @format */

import { configureStore } from "@reduxjs/toolkit";
import userRoleReducer from "./feature/userRoleSlice";
import productsReducer from "./feature/productsSlice";

export const store = configureStore({
  reducer: {
    userRole: userRoleReducer,
    products: productsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
