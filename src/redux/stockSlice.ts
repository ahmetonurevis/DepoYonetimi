import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
  id: string;
  name: string;
  stock: number;
  purchasePrice: number;
  salePrice: number;
  description: string;
}

interface StockState {
  products: Product[];
  stockIncreases: { productId: string; changeAmount: number; timestamp: number }[];
  stockDecreases: { productId: string; changeAmount: number; timestamp: number }[];
}

const initialState: StockState = {
  products: [],
  stockIncreases: [],
  stockDecreases: [],
};

const stockSlice = createSlice({
  name: 'stock',
  initialState,
  reducers: {
    addProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    addStockIncrease: (state, action: PayloadAction<{ productId: string; changeAmount: number; timestamp: number }>) => {
      state.stockIncreases.push(action.payload);
    },
    addStockDecrease: (state, action: PayloadAction<{ productId: string; changeAmount: number; timestamp: number }>) => {
      state.stockDecreases.push(action.payload);
    },
  },
});

export const { addProducts, addStockIncrease, addStockDecrease } = stockSlice.actions;
export default stockSlice.reducer;
