
import React from "react";
import SelectItem from "./SelectItem";
import { useDispatch, useSelector } from "react-redux";
import {FETCH_ADD_VALUE, FETCH_NEW_VALUE, new_input} from "../store/listReducer";
import {FETCH_DELETE_OPTIONS} from "../store/optionReducer";

const Select = ({defaultValue }) => {
    const dispatch = useDispatch();
    const options = useSelector(state => state.options.options);


const selectOption = (value) => {
     dispatch({type: FETCH_ADD_VALUE, payload: value});
     dispatch({type:FETCH_DELETE_OPTIONS, payload:[options, value]})
}

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