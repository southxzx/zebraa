import {createStore, applyMiddleware, compose} from "redux";
import thunkMiddleware from 'redux-thunk';
import rootReducer from "./reducers/rootReducer";

// Enable to use redux dev tool in development mode
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
// Use redux-thunk as a redux middleware
const enhancer = composeEnhancers(applyMiddleware(thunkMiddleware));

const store = createStore(rootReducer, {}, enhancer);

export default store;