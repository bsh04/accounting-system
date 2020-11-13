import {loadState, updateOffset} from "./offsetActions";

const initialState = loadState()

export default function productsReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_OFFSET':
            return loadState();
        case 'UPDATE_OFFSET':
            return updateOffset(action.payload);
        default:
            return state;
    }
}
