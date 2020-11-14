import {UPDATE_OFFSET} from "../types";

const store = localStorage.getItem('offset');

const initialState = {
    offset: store ?? 0 // 0 - показывать все
}

export default function productsReducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_OFFSET:
            localStorage.setItem('offset', action.payload.toString());
            return {...state, offset: action.payload};
        default:
            return state;
    }
}
