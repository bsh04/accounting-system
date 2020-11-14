import {UPDATE_OFFSET} from "./types";

export const updateOffset = (value) => {
    localStorage.setItem('offset', value.toString());
    return {
        type: UPDATE_OFFSET,
        payload: value
    }
}