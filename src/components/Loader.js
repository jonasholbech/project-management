import React, { useEffect, useContext } from "react";
import { MachineContext } from "../models/MachineProvider";
import { store } from "../models/store.js";
import {getAllTasks} from "../utils/tasks";

const Loader = () => {
  const { dispatch } = useContext(store);
  const [, send] = useContext(MachineContext);
  useEffect(()=>{
    getAllTasks(dispatch, send)
  },[dispatch,send])
  return <p>Loading...</p>;
};
export default Loader;
