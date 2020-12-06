import React, {useContext} from "react";
//import netlifyIdentity from 'netlify-identity-widget';
import { Button } from 'rsuite';
import { store } from "../models/store.js";

import {
  Link,
} from 'react-router-dom';

export default function Nav(props) {
  const { dispatch } = useContext(store);
  //const user = netlifyIdentity.currentUser();
  return (<nav>
    {props.children}
    <Link to="/public">Public Page</Link>
    <Link to="/protected">Protected</Link>
    <Link to="/overview">Overview</Link>
    <Link to="/add-task">Add Task</Link>
    <Button appearance="link" onClick={()=>dispatch({type:"TOGGLE_SETTINGS"})}>Settings</Button>
  </nav>)
}
