import React, { useEffect, useContext } from "react";
import { MachineContext } from "../models/MachineProvider";
import { store } from "../models/store.js";
import Loader from "./Loader";

const Main = () => {
  const { globalState, dispatch } = useContext(store);

  const [state, send] = useContext(MachineContext);
  return (<main>
      {state.matches("fetchIt") && <Loader />}
  </main>);
};
export default Main;
