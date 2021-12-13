
import React from "react";
import SelectItem from "./SelectItem";
import { useDispatch, useSelector } from "react-redux";

const Select = ({ values, onChange, defaultValue }) => {
    const dispatch = useDispatch();
    const options = useSelector(state => state.options.options);
    const list = useSelector(state=>state.list.list)


const selectOption = (name) => {
    // const listItem = {
    //     curen : name,
    //     value: 1
    // }

    const selOption = options.find(element => element.curen === name)
    selOption.value = list[0].value * selOption.rait;
    console.log(selOption)

    dispatch({type:'ADD_LISTITEM', payload:selOption});
    dispatch({type:'DELETE_OPTION', payload:selOption.curen});
}


   console.log(options)

    return (
        <div className="wrapper-btn">
            <select
                value=""
                onChange={(event) => selectOption(event.target.value)}
                className="form-select"
                aria-label="Default select example"
            >
                <option selected>{defaultValue}</option>
                {options.map((element) => (
                    <SelectItem key={element.curen} value={element.curen} />
                ))}
            </select>
        </div>
    );
};

export default Select;