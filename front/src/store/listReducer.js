
const defaultStateList = {
    list:[  { curen: "USD", value: 1 },
        { curen: "EUR", value: 1 },
        { curen: "RUB", value: 1 },
        { curen: "BYN", value: 1 }]
};


export const listReducer = (state = defaultStateList, action) => {
    switch (action.type){
        case 'ADD_LISTITEM': return {...state, list:[...state.list, action.payload]}
        case 'NEW_VALUE' : return {...state, list:state.list.map(element => {if(element.curen === action.payload[1]){
            element.value = action.payload[0]
                return element
            }else return element})}
        default:
            return state
    }
}