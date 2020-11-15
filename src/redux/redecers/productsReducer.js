import * as types from "../types";

const store = () => localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : []

const initialState = {
    products: store()
}

const setProduct = products => localStorage.setItem('products', JSON.stringify(products))

export default function productsReducer(state = initialState, action) {
    switch (action.type) {
        case types.ADD_PRODUCT:
            setProduct([...store(), action.payload])
            return {...state, products: [...state.products, action.payload]};
        case types.GENERATE_PRODUCTS:
            setProduct(action.payload)
            return {...state, products: action.payload};
        case types.UPDATE_PRODUCT:
            let newProducts = [...store()]
            newProducts.map(product => {
                if (product.id === action.payload.id) {
                    product.count = action.payload.count
                    product.name = action.payload.name
                }
            })
            setProduct(newProducts)
            return {...state, products: newProducts};
        case types.DELETE_PRODUCT:
            let arr = [...store()].filter(item => item.id !== action.payload)
            setProduct(arr)
            return {...state, products: arr}
        default:
            return state;
    }
}