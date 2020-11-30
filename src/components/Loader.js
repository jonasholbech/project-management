import React, { useEffect, useContext } from "react";
import { MachineContext } from "../models/MachineProvider";
import { store } from "../models/store.js";

const Loader = () => {
  const { dispatch } = useContext(store);

  const [, send] = useContext(MachineContext);

  useEffect(() => {
    fetch("data/database.json")
      .then(res => res.json())
      .then(data => {
        dispatch({
          type: "SET_INITIAL_DATA",
          payload: data
        });
        send("SUCCESS");
      });
  }, [dispatch, send]);
  return <p>Loading...</p>;
};
export default Loader;
