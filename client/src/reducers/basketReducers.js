import { BASKET_ADD_ITEM, BASKET_REMOVE_ITEM } from '../constants/basketConstants';


export const basketReducer = (state = { basketItems: [] }, action) => {
    switch (action.type) {
        case BASKET_ADD_ITEM:
            const item = action.payload;

            const existItem = state.basketItems.find(x => x.productId === item.productId);
            if (existItem) {
                return {
                    ...state,
                    basketItems: state.basketItems.map(x =>
                        x.productId === existItem.productId ? item : x)
                };
            } else {
                return { ...state, basketItems: [...state.basketItems, item] };
            }
        case BASKET_REMOVE_ITEM:
            return {
                ...state,
                basketItems: state.basketItems.filter(x => x.productId !== action.payload)

            };
        default:
            return state;
    }
};
