import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {FETCH_NEW_VALUE, fetchNewVal, new_val} from "../store/listReducer";





const ListItem = ({ currency, value }) => {

    const dispatch = useDispatch();
    const list = useSelector((state) => state.list.list);

    // const changeValue = (value, currency) => {
    //    return  dispatch(new_val([list, value,currency]))
    //     // dispatch(new_value([value,currency]))
    // }

const fetchNew = ([list, value, currensy]) => {
    let arr = list.map(element=>element.curen);

    return {type: FETCH_NEW_VALUE, payload: [arr, value,currensy]}
}

    return (
        <li className="list-group-item flex-listItem">
            <span>{currency}</span>
            <div class="input-group input-group-sm">
                <input
                    type="text"
                    className="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-sm"
                    value={value}
                     onChange={(event)=> dispatch(fetchNew([list, event.target.value,currency]))}
                />
            </div>
        </li>
    );
};

export default ListItem;
