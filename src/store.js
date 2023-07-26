import { configureStore } from "@reduxjs/toolkit";
import formSlice from "./slice";
const store = configureStore({ reducer: formSlice.reducer });
export default store;
