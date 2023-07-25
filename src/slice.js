import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  page: "",
};
const ZaraSlice = createSlice({
  name: "Zara",
  initialState: initialState,
  reducers: {
    PAGE(state, action) {
      state.page = action.payload;
    },
  },
});
export const { PAGE } = ZaraSlice.actions;
export default ZaraSlice;
