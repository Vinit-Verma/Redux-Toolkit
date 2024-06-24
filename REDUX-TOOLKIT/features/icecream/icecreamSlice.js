const { cakeActions } = require("../cake/cakeSlice");

const createSlice = require("@reduxjs/toolkit").createSlice;

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
    builder.addCase(cakeActions.ordered, (state, action) => {
      state.numOfIcecreams--;
    });
  },
  //   extraReducers: {
  //     ["cake/ordered"]: (state, action) => {
  //       state.numOfIcecreams--;
  //     },
  //   },
});

module.exports = icecreamSlice.reducer;
module.exports.icecreamActions = icecreamSlice.actions;
