import {ADD_PRODUCT, DELETE_PRODUCT, GENERATE_PRODUCTS, UPDATE_PRODUCT} from "../types";

const store = () => localStorage.getItem('products');

const initialState = {
    products: store() ? JSON.parse(store()) : []
}

const setProduct = products => {
    localStorage.setItem('products', JSON.stringify(products))
}

export default function productsReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_PRODUCT:
            setProduct([...initialState.products, action.payload])
            return {...state, products: [...state.products, action.payload]};
        case GENERATE_PRODUCTS:
            setProduct(action.payload)
            return {...state, products: action.payload};
        case UPDATE_PRODUCT:
            let newProducts = initialState.products
            newProducts.map(product => {
                if (product.id === action.payload.id) {
                    product.count = action.payload.count
                    product.name = action.payload.name
                }
            })
            setProduct(newProducts)
            return {...state, products: newProducts};
        case DELETE_PRODUCT:
            let arr = [...JSON.parse(store())].filter(item => item.id !== action.payload)
            setProduct(arr)
            return {...state, products: arr}
        default:
            return state;
    }
}
