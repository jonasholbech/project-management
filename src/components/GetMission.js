import React, { useState, useContext, useEffect } from "react";
import { MachineContext } from "../models/MachineProvider";
import { store } from "../models/store.js";
import missions from "../models/missions";
import settings from "../models/settings";

export default function GetMission(props) {
  const { globalState, dispatch } = useContext(store);
  const { players, currentPlayer } = globalState;
  const [showingMission, setShowingMission] = useState(false);
  const [machineState, send] = useContext(MachineContext);
  useEffect(() => {
    if (settings.speedy) {
      dispatch({
        type: "SET_PLAYER_MISSION",
        payload: {
          name: players[currentPlayer].name,
          mission: "Kill everybody"
        }
      });
      dispatch({
        type: "NEXT_PLAYER",
        payload: {}
      });
      dispatch({
        type: "SET_PLAYER_MISSION",
        payload: {
          name: players[currentPlayer].name,
          mission: "Kill everybody"
        }
      });
      send("NEXT");
    }
  }, [currentPlayer, send, dispatch, players]);

  function getPlayerMission() {
    dispatch({
      type: "SET_PLAYER_MISSION",
      payload: {
        name: players[currentPlayer].name,
        mission: "Kill everybody"
      }
    });
    setShowingMission(true);
  }
  function hidePlayerMission() {
    dispatch({
      type: "NEXT_PLAYER",
      payload: {}
    });

    setShowingMission(false);
  }
  if (!showingMission) {
    return (
      <div>
        {players[currentPlayer].mission && (
          <button onClick={() => send("NEXT")}>
            All missions allocated, go battle
          </button>
        )}
        {!players[currentPlayer].mission && (
          <>
            <button onClick={getPlayerMission}>
              Player {players[currentPlayer].name} get your mission
            </button>
            <p>All other players, look away</p>
          </>
        )}
      </div>
    );
  } else {
    return (
      <div>
        <button onClick={hidePlayerMission}>I remember, next player</button>
        <p>Here's your mission</p>
      </div>
    );
  }
}
