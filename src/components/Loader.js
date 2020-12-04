import React, { useEffect, useContext } from "react";
import netlifyIdentity from 'netlify-identity-widget';
import { store } from "../models/store.js";
import {getAllTasks} from "../utils/tasks";

const Loader = (props) => {
  const { globalState, dispatch } = useContext(store);
  const user = netlifyIdentity.currentUser();
  useEffect(()=>{
    getAllTasks(user,dispatch)
  },[user,dispatch])
  return !globalState.loaded ? <p>Loading...</p>:props.children;
};
export default Loader;
