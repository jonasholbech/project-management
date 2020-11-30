import React, {  useContext } from "react";
import { MachineContext } from "../models/MachineProvider";
//import { store } from "../models/store.js";
import Loader from "./Loader";

const Main = () => {
  //const { globalState, dispatch } = useContext(store);

  const [state] = useContext(MachineContext);
  return (<main>
      {state.matches("fetchIt") && <Loader />}
  </main>);
};
export default Main;
