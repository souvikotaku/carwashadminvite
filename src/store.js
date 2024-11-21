// src/store.js
import { configureStore } from '@reduxjs/toolkit';

// Import your slice(s) here
import categoriesReducer from "./features/categoriesSlice";

const store = configureStore({
  reducer: {
    categories: categoriesReducer,  // Add your slice reducers here
  },
});

export default store;
