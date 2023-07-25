import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../firebase";
import { ref, get } from "firebase/database";

const initialState = {
  tests: [],
  status: "Loading",
  error: null,
};
export const fetchTest = createAsyncThunk("tests/fetchTests", async () => {
  try {
    const Testdataref = ref(db, "Exams");
    const snapshot = await get((Testdataref)); 
    if (snapshot.exists()) {
      const data = snapshot.val();
      return data ? Object.values(data) : [];
    } else {
      return [];
    }
  } catch (error) {
    throw error;
  }
});


const ExamSlice = createSlice({
  name: "exams",
  initialState:initialState,
  reducers: {
    ADD(state, action) {
      state.tests = [...state.tests, action.payload];
    },
    DELETE(state, action) {
      state.tests = state.tests.filter((test) => test.Testid !== action.payload);
      // console.log('action.payload', action.payload) 
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTest.pending, (state) => {
        state.status = "Loading";
        // console.log("loading");
      })
      .addCase(fetchTest.fulfilled, (state, action) => {
        state.status = "Recived";
        state.tests = action.payload;
        // console.log("Recived", action.payload);
      })
      .addCase(fetchTest.rejected, (state, action) => {
        state.status = "Error";
        state.error = action.error.message;
        // console.log("action.error.message", action.error.message);
      });
  },
});

export const { ADD, DELETE } = ExamSlice.actions;
export default ExamSlice;
