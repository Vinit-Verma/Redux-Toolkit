const redux = require("redux");
// const createStore = redux.createStore;
const combineReducers = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;

const reduxLogger = require("redux-logger");
const logger = reduxLogger.createLogger();

const CAKE_ORDERED = "CAKE_ORDERED";
const CAKE_RESTOCKED = "CAKE_RESTOCKED";
const ICECREAM_ORDERED = "ICECREAM_ORDERED";
const ICECREAM_RESTOCKED = "ICECREAM_RESTOCKED";

function orderCake(quantity = 1) {
  return {
    type: CAKE_ORDERED,
    payload: quantity,
  };
}

function restockCake(quantity = 1) {
  return {
    type: CAKE_RESTOCKED,
    payload: quantity,
  };
}

function orderIceCream(quantity = 1) {
  return {
    type: ICECREAM_ORDERED,
    payload: quantity,
  };
}

function restockIceCream(quantity = 1) {
  return {
    type: ICECREAM_RESTOCKED,
    payload: quantity,
  };
}

const initialCakeState = {
  numberOfCakes: 10,
};

const initialIceCreamState = {
  numberOfIceCream: 20,
};

// (previousState, action) => newState
const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return {
        ...state,
        numberOfCakes: state.numberOfCakes - 1,
      };
    case CAKE_RESTOCKED:
      return {
        ...state,
        numberOfCakes: state.numberOfCakes + action.payload,
      };
    default:
      return state;
  }
};

const iceCreamReducer = (state = initialIceCreamState, action) => {
  switch (action.type) {
    case ICECREAM_ORDERED:
      return {
        ...state,
        numberOfIceCream: state.numberOfIceCream - 1,
      };
    case ICECREAM_RESTOCKED:
      return {
        ...state,
        numberOfIceCream: state.numberOfIceCream + action.payload,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer,
});

const store = redux.createStore(rootReducer, applyMiddleware(logger));
console.log("Initial State", store.getState());

const unsubscribe = store.subscribe(() => {
  // console.log("subscribed", store.getState());
});

store.dispatch(orderCake());
store.dispatch(orderCake());
store.dispatch(orderCake());
store.dispatch(restockCake(3));

unsubscribe();
