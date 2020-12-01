import React, {  useContext } from "react";
import { MachineContext } from "../models/MachineProvider";
//import { store } from "../models/store.js";

import Loader from "./Loader";
import Overview from "./Overview";

const Main = () => {
  //const { globalState, dispatch } = useContext(store);
  const [state] = useContext(MachineContext);
  
  
  return (<main>
    <h1>Main</h1>
      {state.matches("idle") && <Loader />}
      {state.matches("overview") && <Overview />}
      
  </main>);
};
export default Main;
