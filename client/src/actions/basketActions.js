import axios from 'axios';

import { BASKET_ADD_ITEM, BASKET_REMOVE_ITEM } from '../constants/basketConstants';

export const addToBasket = (id, qty) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${ id }`);

    dispatch({
        type: BASKET_ADD_ITEM,
        payload: {
            productId: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty
        }
    });

    localStorage.setItem('basketItems', JSON.stringify(getState().basket.basketItems));
};

export const removeFromBasket = id => async (dispatch, getState) => {
    dispatch({
        type: BASKET_REMOVE_ITEM,
        payload: id
    });

    localStorage.setItem('basketItems', JSON.stringify(getState().basket.basketItems));
}
