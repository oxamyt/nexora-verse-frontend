import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "@/types/types";

const initialState: AuthState = {
  userId: localStorage.getItem("userId") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
      localStorage.setItem("userId", action.payload);
    },
    logout: (state) => {
      state.userId = null;
      localStorage.removeItem("userId");
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
