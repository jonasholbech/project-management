import React, { useState, useContext } from "react";
import { MachineContext } from "../models/MachineProvider";
import { store } from "../models/store.js";
import settings from "../models/settings";

import GameBoard from "./GameBoard";

//TODO: all territories should start with one unit
//https://www.wikihow.com/Play-Risk

export default function PlaceUnits(props) {
  const [, send] = useContext(MachineContext);
  const { globalState, dispatch } = useContext(store);
  const { players, currentPlayer } = globalState;
  const [numberToPlace, setNumberToPlace] = useState(20);
  const playersWithTroops = players.filter(
    player => player.unitsLeftToPlace > 0
  );

  //TODO: ryk de her ned i body og se om den stadig melder fejl
  if (playersWithTroops.length === 0) {
    send("NO_MORE_UNITS");
    return null;
  }
  if (players[currentPlayer].unitsLeftToPlace < 1) {
    dispatch({
      type: "NEXT_PLAYER",
      payload: {}
    });
    send("UNITS_PLACED");
    return null;
  }
  function place(e) {
    if (Number(e.target.dataset.owner) === currentPlayer) {
      //e.target.dataset.troops = numberToPlace;
      //TODO:validation
      dispatch({
        type: "PLACE_UNITS",
        payload: {
          name: players[currentPlayer].name,
          amount: numberToPlace,
          where: e.target.id
        }
      });
      dispatch({
        type: "NEXT_PLAYER",
        payload: {}
      });
      send("UNITS_PLACED");
    }
  }
  return (
    <>
      <h2>
        {players[currentPlayer].name} place 1 or more units (
        {players[currentPlayer].unitsLeftToPlace} left)
      </h2>
      <input
        type="number"
        value={numberToPlace}
        min="0"
        max={players[currentPlayer].unitsLeftToPlace}
        onChange={e => setNumberToPlace(e.target.value)}
      />
      <GameBoard clickHandler={place} />;
    </>
  );
}
