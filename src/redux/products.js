export default function products(state = false, action) {
    switch(action.type)
    {
        case 'GET_PRODUCTS':
            return action.payload;
        case 'ADD_PRODUCT':
            return action.payload;
        case 'UPDATE_PRODUCT':
            return action.payload;
        case 'DELETE_PRODUCT':
            return false;
        default:
            return state;
    }
}
