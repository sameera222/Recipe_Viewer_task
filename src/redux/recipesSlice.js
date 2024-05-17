
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchRecipes = createAsyncThunk('recipes/fetchRecipes', async () => {
  const response = await axios.get('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  return response.data.meals;
});

const recipesSlice = createSlice({
  name: 'recipes',
  initialState: {
    items: [],
    status: 'idle',
    selectedRecipe: null,
  },
  reducers: {
    selectRecipe: (state, action) => {
      state.selectedRecipe = action.payload;
    },
    addFavorite: (state, action) => {
      const recipe = state.items.find(recipe => recipe.idMeal === action.payload);
      if (recipe) {
        recipe.isFavorite = !recipe.isFavorite;
      }
    },
    updateRecipesOrder: (state, action) => {
      state.items = action.payload;
    },
    addRecipe: (state, action) => {
      state.items.push(action.payload);
    },
    removeRecipe: (state, action) => {
      console.log("Removing recipe with ID:", action.payload);
      state.items = state.items.filter(recipe => recipe.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchRecipes.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { selectRecipe, addFavorite, updateRecipesOrder, addRecipe, removeRecipe } = recipesSlice.actions;

export default recipesSlice.reducer;
