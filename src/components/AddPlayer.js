import React, { useContext, useState, useEffect } from "react";
import { MachineContext } from "../models/MachineProvider";
import { store } from "../models/store.js";
import settings from "../models/settings";
export default function AddPlayer(props) {
  const { globalState, dispatch } = useContext(store);
  const [name, setName] = useState("");
  const { players } = globalState;
  const [, send] = useContext(MachineContext);
  useEffect(() => {
    if (settings.speedy) {
      const startingArmies = 20 + (6 - players.length) * 5;
      dispatch({
        type: "SET_PLAYERS_ARMIES",
        payload: startingArmies
      });
      send("NEXT");
    }
  }, [send, dispatch, players.length]);

  function submitted(e) {
    e.preventDefault();
    //TODO: validation
    dispatch({
      type: "ADD_PLAYER",
      payload: name
    });
    setName("");
    send("ADDED");
  }
  function proceed(e) {
    const startingArmies = 20 + (6 - players.length) * 5;
    dispatch({
      type: "SET_PLAYERS_ARMIES",
      payload: startingArmies
    });
    send("NEXT");
  }
  return (
    <>
      <form onSubmit={submitted}>
        <input
          type="text"
          name="addplayer"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input type="submit" value="Add Player" />
      </form>
      {players.length > 1 && <button onClick={proceed}>Next</button>}
    </>
  );
}
