import {UPDATE_OFFSET} from "../types";

export const updateOffset = (value) => {
    return {
        type: UPDATE_OFFSET,
        payload: value
    }
}