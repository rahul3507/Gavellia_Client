/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserRole = "buyer" | "seller";

interface UserRoleState {
  role: UserRole;
}

const initialState: UserRoleState = {
  role: "buyer",
};

const userRoleSlice = createSlice({
  name: "userRole",
  initialState,
  reducers: {
    setUserRole: (state, action: PayloadAction<UserRole>) => {
      state.role = action.payload;
    },
    toggleUserRole: (state) => {
      state.role = state.role === "buyer" ? "seller" : "buyer";
    },
    switchToBuyer: (state) => {
      state.role = "buyer";
    },
    switchToSeller: (state) => {
      state.role = "seller";
    },
  },
});

export const { setUserRole, toggleUserRole, switchToBuyer, switchToSeller } =
  userRoleSlice.actions;
export default userRoleSlice.reducer;
