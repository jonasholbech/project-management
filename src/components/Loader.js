import React, { useEffect, useContext } from "react";
import netlifyIdentity from 'netlify-identity-widget';
import { store } from "../models/store.js";
import {getAllTasks, getAllTasksForUser, getAllTasksByUser} from "../utils/tasks";
//TODO: I think the loader makes stuff load twice (since overview already loads)
const Loader = (props) => {
  const { globalState, dispatch } = useContext(store);
  const user = netlifyIdentity.currentUser();
  useEffect(()=>{
    switch(globalState.overviewFilter){
      case "createdBy":
        getAllTasksByUser(user, dispatch);
      break;
      case "assignedTo":
        getAllTasksForUser(user, dispatch)
      break;
      default:
        getAllTasks(user,dispatch)
      break;
    }
    
  },[user,dispatch, globalState.overviewFilter])
  return !globalState.loaded ? <p>Loading...</p>:props.children;
};
export default Loader;
