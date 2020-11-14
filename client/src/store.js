import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { productListReducer, productDetailsReducer } from './reducers/productReducers';
import { basketReducer } from './reducers/basketReducers';
import {
    userLoginReducer, userRegisterReducer,
    userDetailsReducer, userUpdateProfileReducer
} from './reducers/userReducers';
import { orderCreateReducer, orderDetailsReducer } from './reducers/orderReducers';

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    basket: basketReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer
});

const basketItemsFromLocalStore = localStorage.getItem('basketItems') ?
    JSON.parse(localStorage.getItem('basketItems')) : [];

const userInfoFromLocalStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null;

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
    ? JSON.parse(localStorage.getItem('shippingAddress'))
    : {};


const initialState = {
    basket: {
        basketItems: basketItemsFromLocalStore,
        shippingAddress: shippingAddressFromStorage
    },
    userLogin: { userInfo: userInfoFromLocalStorage }
};

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
