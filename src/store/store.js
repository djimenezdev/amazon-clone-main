import { configureStore } from '@reduxjs/toolkit';
import basketReducer from '../slices/basketSlice';
import loginReducer from '../slices/loginSlice';
import orderReducer from '../slices/orderSlice';

export default configureStore({
  reducer: {
    basket: basketReducer,
    login: loginReducer,
    order: orderReducer,
  },
});
