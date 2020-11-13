import {addItem, loadState, removeItem, updateItem} from "./localStorage";

const initialState = loadState()

export default function products(state = initialState, action) {
    switch(action.type)
    {
        case 'GET_PRODUCTS':
            return loadState();
        case 'ADD_PRODUCT':
            return addItem(action.payload);
        case 'UPDATE_PRODUCT':
            return updateItem(action.payload);
        case 'DELETE_PRODUCT':
            return removeItem(action.payload)
        default:
            return state;
    }
}
