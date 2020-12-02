import React, { useEffect, useContext } from "react";

import { store } from "../models/store.js";
import {getAllTasks} from "../utils/tasks";

const Loader = (props) => {
  const { globalState, dispatch } = useContext(store);
  
  useEffect(()=>{
    getAllTasks(dispatch)
  },[dispatch])
  return !globalState.loaded ? <p>Loading...</p>:props.children;
};
export default Loader;
