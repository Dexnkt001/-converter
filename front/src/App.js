import List from "./components/List";
import React, {useEffect, useState} from "react";
import Select from "./components/Select";
import {start_val} from "./store/listReducer";
import {useDispatch} from "react-redux";
import {start_opt} from "./store/optionReducer";

function App() {
    const dispatch = useDispatch();

    useEffect(()=>{dispatch(start_val())
    dispatch(start_opt())
    },[])

  // const [currencies, SetCurrency] = useState([
  //   { curen: "USD", rait: 1, value: 1 },
  //   { curen: "EUR", rait: 0.8, value: 1 },
  //   { curen: "RUB", rait: 70, value: 1 },
  //   { curen: "BYN", rait: 2.5, value: 1 },
  // ]);

  // в Лист currencies={currencies}



  // function newValue(value) {
  //   let e = option.find((element) => element.curen === value);
  //   SetCurrency([...currencies, e]);
  //   SetOption(option.filter((element) => element.curen !== value));
  // }

  return (
      <div className="container content">
        <h2>Convert</h2>
        <List />
        <Select
            values=''
            defaultValue="Add new Value"
        />
      </div>
  );
}

export default App;