import React, { useContext } from "react";
import { MachineContext } from "../models/MachineProvider";
import AddPlayer from "./AddPlayer";
import Loader from "./Loader";
import Setup from "./Setup";
import GetMission from "./GetMission";
import PlaceUnits from "./PlaceUnits";
import PlayerTurn from "./PlayerTurn";
export default function Game(props) {
  //TODO: skulle nok bruge useService i stedet
  //https://xstate.js.org/docs/packages/xstate-react/#api
  const [machineState] = useContext(MachineContext);
  return (
    <main>
      {machineState.value === "loading" && <Loader />}
      {machineState.value === "addingPlayer" && <AddPlayer />}
      {machineState.value === "setup" && <Setup />}
      {machineState.value === "getMission" && <GetMission />}
      {machineState.value === "placeUnits" && <PlaceUnits />}
      {["playerStartTurn", "placeUnitsTurn", "playerAttackPhase"].includes(
        machineState.value
      ) && <PlayerTurn />}
    </main>
  );
}
