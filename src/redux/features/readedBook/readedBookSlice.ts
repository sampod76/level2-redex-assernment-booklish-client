import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IBook {
  _id?: string | any;
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  quantity?: number;
}
interface ICart {
  books: IBook[];
  total: number;
}

const initialState: ICart = {
  books: [],
  total: 0,
};

const ReadedSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToReaded: (state, action: PayloadAction<IBook>) => {
      const existing = state.books.find(
        (book) => book._id === action.payload._id
      );
      if (existing) {
        existing.quantity = existing.quantity! + 1;
      } else {
        state.books.push({ ...action.payload, quantity: 1 });
      }
    },
    removeOneReaded: (state, action: PayloadAction<IBook>) => {
      const existing = state.books.find(
        (book) => book._id === action.payload._id
      );
      if (existing && existing.quantity! > 1) {
        existing.quantity = existing.quantity! - 1;
      }
       else {
        state.books = state.books.filter(
          (book) => book._id !== action.payload._id
        );
      }
    },
    removeFromReaded: (state, action: PayloadAction<IBook>) => {
      state.books = state.books.filter(
        (book) => book._id !== action.payload._id
      );
    },
  },
});

export const {
  addToReaded,
  removeFromReaded,
  removeOneReaded,
} = ReadedSlice.actions;

export default ReadedSlice.reducer;
