import { createSlice } from "@reduxjs/toolkit";

export const basketSlice = createSlice({
  name: "basket",
  initialState: {
    basket: [],
  },
  reducers: {
    addToBasket: (state, action) => {
      state.basket = [...state.basket, action.payload.item];
    },
    removeFromBasket: (state, action) => {
      state.basket = action.payload.items;
    },
    emptyBasket: (state) => {
      state.basket = [];
    },
  },
});

export const {
  addToBasket,
  removeFromBasket,
  emptyBasket,
} = basketSlice.actions;

// selectors
export const getBasket = (state) => state.basket.basket;

export default basketSlice.reducer;
