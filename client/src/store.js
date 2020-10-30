import { createStore, combineReducers, applyMiddleware } from 'redux';
import { productListReducer, productDetailsReducer } from './reducers/productReducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';


const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer
});

const initialState = {};

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
