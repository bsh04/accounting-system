import {ADD_PRODUCT, DELETE_PRODUCT, GENERATE_PRODUCTS, UPDATE_PRODUCT} from "./types";

const initState = () => localStorage.getItem('products');

export const removeProduct = (id) => {
    let arr = [...JSON.parse(initState())].filter(item => item.id !== id)
    localStorage.setItem('products', JSON.stringify(arr))
    return {
        type: DELETE_PRODUCT,
        payload: arr
    }
}

export const addProduct = (item) => {
    const product = {name: item.name, count: item.count, id: item.id}
    if (initState() && JSON.parse(initState()).length !== 0) {
        let newProducts = [...JSON.parse(initState()), product]
        localStorage.setItem('products', JSON.stringify(newProducts))
        return {
            type: ADD_PRODUCT,
            payload: product
        }
    } else {
        localStorage.setItem('products', JSON.stringify([product]))
        return {
            type: ADD_PRODUCT,
            payload: product
        }
    }
}

export const generateProducts = (products) => {
    localStorage.setItem('products', JSON.stringify(products))
    return {
        type: GENERATE_PRODUCTS,
        payload: products
    }
}

export const updateProduct = (item) => {
    let newProducts = JSON.parse(initState())
    newProducts.map(product => {
        if (product.id === item.id) {
            product.count = item.count
            product.name = item.name
        }
    })

    localStorage.setItem('products', JSON.stringify(newProducts))
    return {
        type: UPDATE_PRODUCT,
        payload: newProducts
    }
}