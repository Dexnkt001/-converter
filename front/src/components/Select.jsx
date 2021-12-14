
import React from "react";
import SelectItem from "./SelectItem";
import { useDispatch, useSelector } from "react-redux";
import {new_input} from "../store/listReducer";
import {delete_opt} from "../store/optionReducer";

const Select = ({defaultValue }) => {
    const dispatch = useDispatch();
    const options = useSelector(state => state.options.options);
    // const list = useSelector(state=>state.list.list)


const selectOption = (value) => {

    dispatch(new_input(value));
    dispatch(delete_opt(options, value));

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
                    <SelectItem key={element} value={element} />
                ))}
            </select>
        </div>
    );
};

export default Select;