import { createSlice } from "@reduxjs/toolkit";

// Utility function to get categories from localStorage
const getCategoriesFromLocalStorage = () => {
  const categories = localStorage.getItem("categories");
  return categories ? JSON.parse(categories) : [];
};

// Initial state
const initialState = {
  categories: getCategoriesFromLocalStorage(),
  status: "idle",
  error: null,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    addCategory: (state, action) => {
      const newCategory = {
        id: Date.now(), // Simple ID generation logic
        name: action.payload.name,
      };
      state.categories.push(newCategory);
      // Update localStorage when a category is added
      localStorage.setItem("categories", JSON.stringify(state.categories));
    },
    editCategory: (state, action) => {
      const { id, name } = action.payload;
      const categoryIndex = state.categories.findIndex(
        (category) => category.id === id
      );
      if (categoryIndex !== -1) {
        state.categories[categoryIndex].name = name;
        // Update localStorage when a category is edited
        localStorage.setItem("categories", JSON.stringify(state.categories));
      }
    },
    deleteCategory: (state, action) => {
      const id = action.payload;
      state.categories = state.categories.filter(
        (category) => category.id !== id
      );
      // Update localStorage when a category is deleted
      localStorage.setItem("categories", JSON.stringify(state.categories));
    },
  },
});

export const { addCategory, editCategory, deleteCategory } =
  categoriesSlice.actions;

export default categoriesSlice.reducer;
