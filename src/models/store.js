// store.js
import React, { createContext, useReducer } from "react";

const initialState = {
  tasks: [
  ],
};
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [globalState, dispatch] = useReducer((state = initialState, action) => {
    if(action.type==="SET_INITIAL_DATA"){
      return { ...state, tasks: action.payload };
    }
    if(action.type === "TASK_DELETED"){
      const nextTasks = state.tasks.filter(t=>t._id!==action.payload);
      return { ...state, tasks: nextTasks };
    }
    /* if (action.type === "SET_LANDS") {
      return { ...state, lands: action.payload };
    }
    if (action.type === "ADD_PLAYER") {
      const newPlayers = state.players.concat({
        name: action.payload,
        mission: null,
        unitsLeftToPlace: 0
      });
      return { ...state, players: newPlayers };
    }
    if (action.type === "ADD_PLAYER_ARMIES") {
      const players = [...state.players];
      players[state.currentPlayer].unitsLeftToPlace = action.payload;
      return { ...state, players: players };
    }
    if (action.type === "SET_PLAYERS_ARMIES") {
      const players = state.players.map(player => {
        player.unitsLeftToPlace = action.payload;
        return player;
      });
      return { ...state, players: players };
    }
    if (action.type === "PLACE_UNITS") {
      console.log("PLACING UNITS");
      const players = state.players.map(player => {
        if (player.name === action.payload.name) {
          console.log("player found");
          player.unitsLeftToPlace -= action.payload.amount;
        }
        return player;
      });
      const lands = state.lands.map(land => {
        if (land.id === action.payload.where) {
          console.log("land found");
          land.troops += action.payload.amount;
        }
        return land;
      });
      return { ...state, players: players, lands: lands };
    }
    if (action.type === "SET_PLAYER_LAND") {
      const lands = state.lands.map(land => {
        if (land.id === action.payload.land) {
          land.owner = action.payload.owner;
          land.troops = action.payload.troops;
        }
        return land;
      });
      return { ...state, lands: lands };
    }
    if (action.type === "NEXT_PLAYER") {
      let current = state.currentPlayer + 1;
      if (current === state.players.length) {
        current = 0;
      }

      return { ...state, currentPlayer: current };
    }
    if (action.type === "SET_PLAYER_MISSION") {
      const players = state.players.map(player => {
        if (player.name === action.payload.name) {
          player.mission = action.payload.mission;
        }
        return player;
      });
      return { ...state, players: players };
    } */
    /*  default:
        throw new Error();*/
  }, initialState);

  return <Provider value={{ globalState, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
