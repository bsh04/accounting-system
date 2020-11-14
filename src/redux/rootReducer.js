import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import productsReducer from './redecers/productsReducer';
import offsetReducer from "./redecers/offsetReducer";

export default combineReducers({
    routing: routerReducer,
    products: productsReducer,
    offset: offsetReducer
});