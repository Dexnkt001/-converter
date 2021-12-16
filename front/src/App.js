import List from "./components/List";
import React, {useEffect, useState} from "react";
import Select from "./components/Select";
import {fetchStartInp, start_val} from "./store/listReducer";
import {fetchStartOpt, start_opt} from "./store/optionReducer";
import {useDispatch} from "react-redux";

function App() {
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(fetchStartInp())
  dispatch(fetchStartOpt())
    },[])


  return (
      <div className="container content">
        <h2>Convert</h2>
        <List />
        <Select
            values = ''
            defaultValue = "Add new Value"
        />
      </div>
  );
}

export default App;