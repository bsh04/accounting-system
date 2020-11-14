import {ADD_PRODUCT, DELETE_PRODUCT, GENERATE_PRODUCTS, UPDATE_PRODUCT} from "./types";

const store = localStorage.getItem('products');

const initialState = {
    products: JSON.parse(store) ? JSON.parse(store) : []
}

export default function productsReducer(state = initialState, action) {
    switch(action.type)
    {
        case ADD_PRODUCT:
            return {...state, products: [...state.products, action.payload]};
        case GENERATE_PRODUCTS:
            return {...state, products: action.payload};
        case UPDATE_PRODUCT:
            return {...state, products: action.payload};
        case DELETE_PRODUCT:
            return {...state, products: [...action.payload]}
        default:
            return state;
    }
}
