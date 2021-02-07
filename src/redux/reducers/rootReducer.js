import { combineReducers } from 'redux';
import { clientReducer, openOrCloseComponentReducer } from './clients.js';
import { picturesReducer } from './pictures.js';
import { baseReducer } from './baseReducer.js';

const rootReducer = combineReducers({
    clientReducer,
    openOrCloseComponentReducer,
    picturesReducer,
    baseReducer
});

export default rootReducer;