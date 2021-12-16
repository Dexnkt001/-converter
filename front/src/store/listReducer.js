import {ofType} from "redux-observable";
import {ajax} from "rxjs/ajax";
import {map, mergeMap} from "rxjs";

const defaultStateList = {
    list:[]
};


const NEW_VALUE = 'NEW_VALUE';
const START_VALUE ='START_VALUE';
const ADD_INPUT = 'ADD_INPUT';
const START_FETCH_INPUT = 'START_FETCH_INPUT';
export const FETCH_NEW_VALUE = 'FETCH_NEW_VALUE';
export const FETCH_ADD_VALUE = 'FETCH_ADD_VALUE';

const start_value = (payload) => ({type:START_VALUE, payload});
const new_value = (payload) =>({type:NEW_VALUE, payload});
export const fetchStartInp = () => ({type:START_FETCH_INPUT});
//export const fetchNewVal = (payload) => ({type:FETCH_NEW_VALUE}, payload)


export const fetchStartInput = action$ => {
    console.log(action$)
   return action$.pipe(
        ofType(START_FETCH_INPUT),
      mergeMap(() => {
          console.log('я в мердже')
          return ajax.getJSON('http://localhost:5000/start_val').pipe(
              map(response =>
                  start_value(response))
          )
      }
      )
    )
}

export const new_input = (curren) => {
    console.log('обавляю новый инпут')
    return async function (dispatch){
        console.log('я в диспатче')
        let req = await fetch(`http://localhost:5000/choose_input?curren=${curren}`)
        let res = await req.json()
        return dispatch(add_input(res))
    }
}

export const fetchAddValue = action$ => {
    console.log(action$)
    return action$.pipe(
        ofType(FETCH_ADD_VALUE),
        mergeMap((action) => {
                console.log('я в мердже - новый инпут', action)
                return ajax.getJSON(`http://localhost:5000/choose_input?curren=${action.payload}`).pipe(
                    map(response =>{
                            console.log(response)
                        return add_input(response)
                        }
                    )
                )
            }
        )
    )
}

export const fetchNewValue = action$ => {
    console.log(action$)
    return action$.pipe(
        ofType(FETCH_NEW_VALUE),
        mergeMap((action) => {
                console.log('я в мердже', action)
            // let arr = action[0].map(element=>element.curen)
            // console.log(arr)
                return ajax.getJSON(`http://localhost:5000/new_val?val=${action.payload[1]}&curen=${action.payload[2]}&list=${action.payload[0]}`).pipe(
                    map(response =>{
                     console.log(response)
                        return new_value(response)
                    }
                    )
                )
            }
        )
    )
}



// const start_value_1 = action$ => action$.pipe(
//     ofType(START_VALUE),
// )


export const new_val =  (info) =>{
    console.log(info)
    const arr = info[0].map(element=>element.curen)
    return async function(dispatch){
        let req = await fetch(`http://localhost:5000/new_val?val=${info[1]}&curen=${info[2]}&list=${arr}`)
        let res = await req.json()

        console.log(res)
        return dispatch(new_value(res))
        // console.log(dispatch({})
    }
}

export const start_val = () => {
    console.log('запуск')
    return async function (dispatch){
        console.log('я в диспатче')
        let req = await fetch('http://localhost:5000/start_val')
        let res = await req.json()
        return dispatch(start_value(res))
    }
}


export const listReducer = (state = defaultStateList, action) => {
    switch (action.type){
        case ADD_INPUT: return {...state, list:[...state.list, action.payload]}

            case START_VALUE: return {...state, list:action.payload}

        case NEW_VALUE : return {...state, list:action.payload}
        default:
            return state
    }
}

const add_input = (payload) => ({type:ADD_INPUT, payload})
