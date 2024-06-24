import { createSlice } from "@reduxjs/toolkit";
import { ordered as cakeOrdered } from "../cake/cakeSlice";

const initialState = {
  numOfIcecreams: 20,
};

const icecreamSlice = createSlice({
  name: "icecream",
  initialState,
  reducers: {
    ordered: (state) => {
      state.numOfIcecreams--;
    },
    restocked: (state, action) => {
      state.numOfIcecreams += action.payload;
    },
  },
  extraReducers: (builder) => {
    // Can write any of the following two lines of code :-
    // builder.addCase("cake/ordered", (state, action) => {
    builder.addCase(cakeOrdered, (state, action) => {
      state.numOfIcecreams--;
    });
  },
  //   extraReducers: {
  //     ["cake/ordered"]: (state, action) => {
  //       state.numOfIcecreams--;
  //     },
  //   },
});

export default icecreamSlice.reducer;
export const { ordered, restocked } = icecreamSlice.actions;
