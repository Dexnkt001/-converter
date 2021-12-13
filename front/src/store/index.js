import {createStore, combineReducers} from "redux";
import {listReducer} from "./listReducer";
import {optionsReducer} from "./optionReducer";
import {composeWithDevTools} from "redux-devtools-extension";


const rootReducer = combineReducers({
    list:listReducer,
    options:optionsReducer
})

export const store = createStore(rootReducer, composeWithDevTools());

