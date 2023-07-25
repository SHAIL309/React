import { configureStore } from "@reduxjs/toolkit";
import ExamSlice from "./components/slice";
const store = configureStore({ reducer: ExamSlice.reducer });
export default store;
