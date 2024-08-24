import { createSlice } from "@reduxjs/toolkit";

export type TUser = {
  email: string;
  role: string;
};

interface CounterState {
  user: null | TUser;
  token: null | string;
}

// Define the initial state using that type
const initialState: CounterState = {
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    logInUser: (state, action) => {
      (state.user = action.payload.user), (state.token = action.payload.token);
    },
    logOutUser: (state) => {
      (state.user = null), (state.token = null);
    },
  },
});

export const { logInUser, logOutUser } = authSlice.actions;

export default authSlice.reducer;
