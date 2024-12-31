import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: [],
  products: [],
  selectedCategory: 'ALL',
  skip: 1,
  searchQuery: '',
  hasMore: true,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    addProducts: (state, action) => {
      state.products = [...state.products, ...action.payload];
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setPagination: (state, action) => {
      state.skip = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setHasMore: (state, action) => {
      state.hasMore = action.payload;
    },
  },
});

export const {
  setCategories,
  setProducts,
  addProducts,
  setSelectedCategory,
  setPagination,
  setSearchQuery,
  setHasMore,
} = productsSlice.actions;

export default productsSlice.reducer; 
