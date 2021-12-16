import {createStore, combineReducers, applyMiddleware} from "redux";
import {fetchAddValue, fetchNewValue, fetchStartInput, listReducer} from "./listReducer";
import {fetchDeleteOptions, fetchStartOptions, optionsReducer} from "./optionReducer";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import {combineEpics, createEpicMiddleware} from "redux-observable";


const rootEpic = combineEpics(
    fetchStartInput,
fetchNewValue,
    fetchStartOptions,
    fetchAddValue,
    fetchDeleteOptions
)

    // fetchStartInput
    // fetchNewValue



const rootReducer = combineReducers({
    list:listReducer,
    options:optionsReducer
})

const epicMiddleware = createEpicMiddleware();

 // applyMiddleware(epicMiddleware)

export function configureStore(){

    const store = createStore(rootReducer, applyMiddleware(epicMiddleware));

   epicMiddleware.run(rootEpic);

    return store

}

