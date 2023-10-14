import {createStore, compose, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import userReducer from './reducers/userReducer';

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
  composeEnhancer(applyMiddleware(thunk)),
);

export default store;
