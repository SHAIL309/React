import { configureStore } from "@reduxjs/toolkit";
import ZaraSlice from "./slice";

const store=configureStore({reducer:ZaraSlice.reducer})
export default store