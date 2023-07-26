import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  values: [],
};
const formSlice = createSlice({
  name: "form",
  initialState: initialState,
  reducers: {
    Add: (state, action) => {
      state.values.push(action.payload);
    },
    Delete: (state, action) => {
      state.values = state?.values.filter(
        (person) => person?.id !== action.payload
      );
    },
    Edit: (state, action) => {
      // console.log("ac", action.payload);
      const { id, updatedData } = action?.payload;

      // console.log("slice", id, updatedData);
      state.values = state.values.map((item) => {
        if (item.id === id) {
          return { ...item, ...updatedData };
        } else {
          return item;
        }
      });
    },

    Sort: (state, action) => {
      const { id, direction } = action.payload;

      state.values.sort((a, d) => {
        if (a[id] < d[id]) {
          return direction === "asc" ? -1 : 1;
        }
        if (a[id] > d[id]) {
          return direction === "desc" ? -1 : 1;
        }
        return 0;
      });
    },
    Filter: (state, action) => {
      if (action.payload.trim() === " ") {
        state.values = state;
        console.log("state.values", state);
      } else {
        state.values = state.values.filter(({ id, Name, age, dob }) => {
          return (
            id.includes(action.payload) ||
            Name.includes(action.payload.toLowerCase()) ||
            Name.includes(action.payload.toUpperCase()) ||
            age.includes(action.payload) ||
            dob.includes(action.payload)
          );
        });
      }
    },
  },
});
export const act = {
  Delete: formSlice.actions.Delete,
  Sort: formSlice.actions.Sort,
  Filter: formSlice.actions.Filter,
  Add: formSlice.actions.Add,
  Edit: formSlice.actions.Edit,
};
export const formReducer = formSlice.reducer;
export default formSlice;
