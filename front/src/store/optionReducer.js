import {ofType} from "redux-observable";
import {map, mergeMap} from "rxjs";
import {ajax} from "rxjs/ajax";

const listOptions = {
    options:[]
};

const START_OPTIONS = 'START_OPTIONS';
const DELETE_OPTION = 'DELETE_OPTION';
const FETCH_START_OPTIONS = 'FETCH_START_OPTIONS';
export const FETCH_DELETE_OPTIONS = 'FETCH_DELETE_OPTIONS';

export const fetchStartOpt = () => ({type:FETCH_START_OPTIONS});

export const fetchDeleteOptions = action$ => {
    console.log(action$)
    return action$.pipe(
        ofType(FETCH_DELETE_OPTIONS),
        mergeMap((action ) => {
                console.log('я в мердже удаления options ', action)
                return ajax.getJSON(`http://localhost:5000/delete_options?list=${action.payload[0]}&val=${action.payload[1]}`).pipe(
                    map(response => {
                        console.log(response)
                        return delete_options(response)})
                )
            }
        )
    )
}


export const fetchStartOptions = action$ => {
    console.log(action$)
    return action$.pipe(
        ofType(FETCH_START_OPTIONS),
        mergeMap(()=> {
                console.log('я в мердже options ')
                return ajax.getJSON(`http://localhost:5000/options`).pipe(
                    map(response => start_options(response))
                )
            }
        )
    )
}


export const start_opt = () => {
    console.log('я в опшнах')
    return async function(dispatch){
        let req = await fetch(`http://localhost:5000/options`)
        let res = await req.json()

        console.log(res)
        return dispatch(start_options(res))
    }
}

export const delete_opt = (list, element) => {
    console.log('я удаляю опшн')
    return async function(dispatch){
        let req = await fetch(`http://localhost:5000/delete_options?list=${list}&val=${element}`)
        let res = await req.json()

        console.log(res, 'то что пришло с сервера')
        return dispatch(delete_options(res))
    }
}


export const optionsReducer = (state = listOptions, action) => {
    switch (action.type){
        case START_OPTIONS: return {...state, options:action.payload}

        case DELETE_OPTION: return  {...state, options:action.payload}

        default:
            return state
    }
}

export const start_options = (payload) => ({type:START_OPTIONS, payload})
export const delete_options = (payload) => ({type:DELETE_OPTION, payload})