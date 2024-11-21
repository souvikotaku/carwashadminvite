// src/features/yourFeatureSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
};

const yourFeatureSlice = createSlice({
  name: 'yourFeature',
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setData } = yourFeatureSlice.actions;
export default yourFeatureSlice.reducer;
