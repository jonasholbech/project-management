import React, { useEffect, useContext } from "react";
import { MachineContext } from "./models/MachineProvider";
import { store } from "./models/store.js";
import Land from "./components/Land";
const Test = () => {
  const { globalState, dispatch } = useContext(store);
  const { lands } = globalState;
  const [state, send] = useContext(MachineContext);
  const players = [1, 2];
  useEffect(() => {
    fetch("data/lands.json")
      .then(res => res.json())
      .then(data => {
        const landsWithOwner = data.map(land => {
          land.owner = players[Math.floor(Math.random() * 2)];
          return land;
        });
        dispatch({
          type: "SET_LANDS",
          payload: landsWithOwner
        });
        send("COMPLETED");
      });
  }, []);
  return (
    <>
      <h2>currently on: {state.value}</h2>
      {state.nextEvents.map(next => {
        return <button onClick={() => send(next)}>{next}</button>;
      })}
      <svg viewBox="0 0 1000 1000">
        {lands.map(land => {
          return (
            <Land
              owner={land.owner}
              id={land.id}
              title={land.title}
              d={land.d}
            />
          );
        })}
      </svg>
    </>
  );
};
export default Test;
