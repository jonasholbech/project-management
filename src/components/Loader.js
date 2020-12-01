import React, { useEffect, useContext } from "react";
import { MachineContext } from "../models/MachineProvider";
import { store } from "../models/store.js";
import {getTasks} from "../utils/getAllTasks";

const Loader = () => {
  const { dispatch } = useContext(store);
  const [, send] = useContext(MachineContext);
  useEffect(()=>{
    getTasks(dispatch, send)
  },[dispatch,send])
  return <p>Loading...</p>;
};
export default Loader;
