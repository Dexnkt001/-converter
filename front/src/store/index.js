import {createStore, combineReducers, applyMiddleware} from "redux";
import {listReducer} from "./listReducer";
import {optionsReducer} from "./optionReducer";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";


const rootReducer = combineReducers({
    list:listReducer,
    options:optionsReducer
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

