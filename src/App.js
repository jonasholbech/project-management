import React from "react";
import { StateProvider } from "./models/store.js";
import Main from "./components/Main";
//import Game from "./components/Game";

import "./App.css";

import { useMachine } from "@xstate/react";
import flowMachine from "./models/stateMachine";
import { MachineProvider } from "./models/MachineProvider";
import Debugger from "./Debugger.js";

function App() {
  const machineInstance = useMachine(flowMachine, {devTools:true});
  return (
    <div className="App">
      <StateProvider>
        <MachineProvider machineInstance={machineInstance}>
          <Debugger />
          <Main />
        </MachineProvider>
      </StateProvider>
    </div>
  );
}

export default App;
