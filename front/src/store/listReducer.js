
const defaultStateList = {
    list:[]
};

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

export const new_input = (curren) => {
    console.log('обавляю новый инпут')
    return async function (dispatch){
        console.log('я в диспатче')
        let req = await fetch(`http://localhost:5000/choose_input?curren=${curren}`)
        let res = await req.json()
        return dispatch(add_input(res))
    }
}

const NEW_VALUE = 'NEW_VALUE';
const START_VALUE ='START_VALUE';
const ADD_INPUT = 'ADD_INPUT';

export const listReducer = (state = defaultStateList, action) => {
    switch (action.type){
        case ADD_INPUT: return {...state, list:[...state.list, action.payload]}

            case START_VALUE: return {...state, list:action.payload}

        case NEW_VALUE : return {...state, list:action.payload}
        default:
            return state
    }
}

const new_value = (payload) =>({type:NEW_VALUE, payload})
const start_value = (payload) => ({type:START_VALUE, payload})
const add_input = (payload) => ({type:ADD_INPUT, payload})
