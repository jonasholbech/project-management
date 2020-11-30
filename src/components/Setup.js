import React, { useContext, useEffect } from "react";
import { MachineContext } from "../models/MachineProvider";
import { store } from "../models/store.js";
import settings from "../models/settings";
import GameBoard from "./GameBoard";

export default function Setup(props) {
  const { globalState, dispatch } = useContext(store);
  const { lands, players, currentPlayer } = globalState;

  const [, send] = useContext(MachineContext);
  useEffect(() => {
    if (settings.speedy) {
      let counter = 0;
      const landsWithOwner = lands.map(land => {
        land.owner = counter;
        land.troops = 1;
        counter++;
        if (counter >= players.length) {
          counter = 0;
        }
        return land;
      });
      dispatch({
        type: "SET_LANDS",
        payload: landsWithOwner
      });
      send("LANDS_DIVIDED");
      return;
    }
    const notGiven = lands.filter(land => land.owner === null);
    if (notGiven.length === 0) {
      send("LANDS_DIVIDED");
      return;
    }
    const nextLand = notGiven[Math.floor(Math.random() * notGiven.length)];

    setTimeout(() => {
      dispatch({
        type: "SET_PLAYER_LAND",
        payload: {
          owner: currentPlayer,
          land: nextLand.id,
          troops: 1
        }
      });
      dispatch({
        type: "NEXT_PLAYER",
        payload: {}
      });
    }, 20);
  }, [lands]);
  return <GameBoard />;
}
