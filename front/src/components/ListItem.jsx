import React from "react";
import {useDispatch, useSelector} from "react-redux";





const ListItem = ({ currency, value }) => {

    const dispatch = useDispatch();
    const list = useSelector((state) => state.list.list);

    const changeValue = (value, currency) => {
        dispatch({type:'NEW_VALUE', payload:[value, currency]})
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
                    onChange={(event)=> changeValue(event.target.value, currency)}
                />
            </div>
        </li>
    );
};

export default ListItem;
