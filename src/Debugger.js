import React, { useContext } from "react";
import { MachineContext } from "./models/MachineProvider";
import { store } from "./models/store.js";

export default function Debugger(props) {
  const [state, send] = useContext(MachineContext);
  const { globalState } = useContext(store);
  console.log(state)
  console.log(globalState)
  return (
    <div>
      <h2>currently on: {state.value}</h2>
      {state.nextEvents.map(next => {
        return (
          <button key={next} onClick={() => send(next)}>
            {next}
          </button>
        );
      })}
    </div>
  );
}
