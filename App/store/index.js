import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import logger from "redux-logger";
import userReducer from "./reducers/userReducer";
const thunk = require("redux-thunk").thunk;

const INITIAL_STATE = {
  user: null,
};

const reducer = combineReducers({
  user: userReducer,
});

const composeEnhancer = compose;

const store = createStore(
  reducer,
  INITIAL_STATE,
  composeEnhancer(applyMiddleware(thunk, logger))
);

export default store;
