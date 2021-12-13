import React from "react";
import ListItem from "./ListItem";
import { useSelector } from "react-redux";

function List() {


   // const dispatch = useDispatch();
    const list = useSelector((state) => state.list.list);

    console.log(list)
    return (
        <ul className="list-group list-i">
            {list.map((element) => (
                <ListItem
                    key={element.curen}
                    currency={element.curen}
                    value={element.value}
                />
            ))}
        </ul>
    );
}

export default List;