import { configureStore } from '@reduxjs/toolkit';
import productsSlice from '../redux/slice';

const store = configureStore({
  reducer: {
    products: productsSlice, 
  },
});

export default store;



