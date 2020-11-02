import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { productListReducer, productDetailsReducer } from './reducers/productReducers';
import { basketReducer } from './reducers/basketReducers';

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    basket: basketReducer
});

const basketItemsFromLocalStore = localStorage.getItem('basketItems') ?
    JSON.parse(localStorage.getItem('basketItems')) : [];

const initialState = {
    basket: { basketItems: basketItemsFromLocalStore }
};

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
