import {createStore} from 'redux';

import products from "./products";
import {loadState} from "./localStorage";

const persistedState = loadState();

export const store = createStore(
    products,
    persistedState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

// store.subscribe()