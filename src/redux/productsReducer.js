import {addItem, generateProducts, loadState, removeItem, updateItem} from "./productsActions";

const initialState = loadState()

export default function productsReducer(state = initialState, action) {
    switch(action.type)
    {
        case 'GET_PRODUCTS':
            return loadState();
        case 'ADD_PRODUCT':
            return addItem(action.payload);
        case 'GENERATE_PRODUCTS':
            return generateProducts(action.payload)
        case 'UPDATE_PRODUCT':
            return updateItem(action.payload);
        case 'DELETE_PRODUCT':
            return removeItem(action.payload)
        default:
            return state;
    }
}
