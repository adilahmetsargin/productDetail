import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

const initialState = {
  brands: [],
  models: [],
  selectedBrands: [],
  selectedModels: [],
  searchTerm: "",
  searchBrandTerm: "",
  status: "idle",
  error: null,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get(
      "https://5fc9346b2af77700165ae514.mockapi.io/products/"
    );
    return response.data;
  }
);

export const searchBrands = (products, searchBrandTerm) => {
  return products.filter((product) =>
    product.brand.toLowerCase().includes(searchBrandTerm.toLowerCase())
  );
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    filterByPrice(state, action) {
      const { sortBy } = action.payload;
      if (sortBy === "lowToHigh") {
        state.productList = [...state.productList].sort(
          (a, b) => a.price - b.price
        );
      } else if (sortBy === "highToLow") {
        state.productList = [...state.productList].sort(
          (a, b) => b.price - a.price
        );
      } else if (sortBy === "oldToNew") {
        state.productList = [...state.productList].sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
      } else if (sortBy === "newToOld") {
        state.productList = [...state.productList].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      }
    },
    filterByBrand(state, action) {
      state.selectedBrands = action.payload;
    },
    filterByModel(state, action) {
      state.selectedModels = action.payload;
    },
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.productList = action.payload;
        const uniqueBrands = [
          ...new Set(action.payload.map((product) => product.brand)),
        ];
        const uniqueModels = [
          ...new Set(action.payload.map((product) => product.model)),
        ];
        state.brands = uniqueBrands;
        state.models = uniqueModels;
      })

      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { filterByPrice, filterByBrand, setSearchTerm, filterByModel } =
  productSlice.actions;

export default productSlice.reducer;
