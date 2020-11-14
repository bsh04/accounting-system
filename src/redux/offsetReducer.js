import {UPDATE_OFFSET} from "./types";

const store = localStorage.getItem('offset');

const initialState = {
    offset: store ?? 0
}

export default function productsReducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_OFFSET:
            return {...state, offset: action.payload};
        default:
            return state;
    }
}
