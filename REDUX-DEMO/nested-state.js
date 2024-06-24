const redux = require("redux");
const produce = require("immer").produce;

const initialState = {
  name: "Vinit",
  address: {
    street: "278 Nanak Puri",
    city: "Ludhiana",
    State: "Punjab",
  },
};

const UPDATE_STREET = "UPDATE_STREET";

// Action
const updateStreet = (street) => {
  return {
    type: UPDATE_STREET,
    payload: street,
  };
};

// Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_STREET:
      //   return {
      //     ...state,
      //     address: {
      //       ...state.address,
      //       street: action.payload,
      //     },
      //   };

      //   Can use immer instead of the above code.
      return produce(state, (draft) => {
        draft.address.street = action.payload;
      });
    default:
      return state;
  }
};

const store = redux.createStore(reducer);
console.log("Initial state", store.getState());
const unsubscribe = store.subscribe(() => {
  console.log("Updated state", store.getState());
});
store.dispatch(updateStreet("218 Nanak Puri"));
unsubscribe();
