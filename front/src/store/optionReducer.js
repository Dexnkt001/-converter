
const listOptions = {
    options:[ { curen: "UA", rait: 100 },
        { curen: "KZ", rait: 80 },
        { curen: "PL", rait: 90 },]
};




export const optionsReducer = (state = listOptions, action) => {
    switch (action.type){
        case 'DELETE_OPTION':

            return {...state, options: state.options.filter(element=>element.curen!==action.payload)}
        default:
            return state
    }
}