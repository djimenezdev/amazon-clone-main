import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    loginEmail: "Hello Guest",
  },
  reducers: {
    displayEmail: (state, action) => {
      state.loginEmail = action.payload.userEmail;
    },
  },
});

export const { displayEmail } = loginSlice.actions;

export const getEmail = (state) => state.login.loginEmail;

export default loginSlice.reducer;
