import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import productsReducer from './productsReducer';
import offsetReducer from "./offsetReducer";

export default combineReducers({
    routing: routerReducer,
    products: productsReducer,
    offset: offsetReducer
});