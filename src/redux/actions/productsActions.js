import * as types from "../types";

export const removeProduct = (id) => {
    return {
        type: types.DELETE_PRODUCT,
        payload: id
    }
}

export const addProduct = (item) => {
    return {
        type: types.ADD_PRODUCT,
        payload: {name: item.name, count: item.count, id: item.id}
    }
}

export const generateProducts = (products) => {
    return {
        type: types.GENERATE_PRODUCTS,
        payload: products
    }
}

export const updateProduct = (item) => {
    return {
        type: types.UPDATE_PRODUCT,
        payload: {name: item.name, count: item.count, id: item.id}
    }
}