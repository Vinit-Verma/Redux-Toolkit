const redux = require("redux");
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
const { thunk } = require("redux-thunk");
const axios = require("axios");

const initialState = {
  loading: false,
  users: [],
  error: "",
};

const FETCH_USER_REQUESTED = "FETCH_USER_REQUESTED";
const FETCH_USER_SUCCEEDED = "FETCH_USER_SUCCEEDED";
const FETCH_USER_FAILED = "FETCH_USER_FAILED";

const fetchUsersRequest = () => {
  return {
    type: FETCH_USER_REQUESTED,
  };
};
const fetchUsersSuccess = (user) => {
  return {
    type: FETCH_USER_SUCCEEDED,
    payload: user,
  };
};
const fetchUsersFailure = (error) => {
  return {
    type: FETCH_USER_FAILED,
    payload: error,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USER_SUCCEEDED:
      return {
        loading: false,
        users: action.payload,
        error: "",
      };
    case FETCH_USER_FAILED:
      return {
        loading: false,
        users: [],
        error: action.payload,
      };
  }
};

const fetchUsers = () => {
  return function (dispatch) {
    dispatch(fetchUsersRequest());
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        const users = response.data.map((user) => user.id);
        dispatch(fetchUsersSuccess(users));
      })
      .catch((error) => {
        console.log("error occured", error);
        dispatch(fetchUsersFailure(error.message));
      });
  };
};

const store = createStore(reducer, applyMiddleware(thunk));
const unsubscribe = store.subscribe(() => {
  console.log("Initial state", store.getState());
});
store.dispatch(fetchUsers());
