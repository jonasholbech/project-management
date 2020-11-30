import React, { useContext } from "react";
import { MachineContext } from "../models/MachineProvider";
import { store } from "../models/store.js";
import calculateUnits from "../models/calculateUnits";
import GameBoard from "./GameBoard";

export default function PlayerTurn(props) {
  const [machineState, send] = useContext(MachineContext);
  const { globalState, dispatch } = useContext(store);
  const { players, currentPlayer, lands } = globalState;
  //TODO: I really need to figure out substates
  if (machineState.value === "playerStartTurn") {
    dispatch({
      type: "ADD_PLAYER_ARMIES",
      payload: calculateUnits(lands, currentPlayer)
    });
    send("GOT_UNITS");
  }
  function place(e) {
    if (Number(e.target.dataset.owner) === currentPlayer) {
      dispatch({
        type: "PLACE_UNITS",
        payload: {
          name: players[currentPlayer].name,
          amount: 1,
          where: e.target.id
        }
      });
      if (players[currentPlayer].unitsLeftToPlace < 2) {
        //state change hasn't happened yet, I hope
        send("NO_MORE_UNITS");
      } else {
        send("UNIT_PLACED");
      }
    }
  }
  function select(e) {}
  return (
    <>
      <h2>{players[currentPlayer].name}'s' turn</h2>
      {machineState.value === "placeUnitsTurn" && (
        <>
          <p>Place your units ({players[currentPlayer].unitsLeftToPlace})</p>
          <GameBoard clickHandler={place} />
        </>
      )}
      {machineState.value === "playerAttackPhase" && (
        <>
          <p>Attack phase</p>
          <GameBoard clickHandler={select} />
        </>
      )}
    </>
  );
}
