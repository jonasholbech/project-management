// store.js
import React, { createContext, useReducer } from "react";

const initialState = {
  tasks: [],
  loaded:false,
  showSettings:false
};
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [globalState, dispatch] = useReducer((state = initialState, action) => {
    
    if(action.type==="TOGGLE_SETTINGS"){
      return {...state, showSettings:!state.showSettings}
    }
    if(action.type==="SET_INITIAL_DATA"){
      return { ...state, tasks: action.payload, loaded:true };
    }
    if(action.type === "TASK_DELETED" || action.type==="TASK_CLOSED"){
      const nextTasks = state.tasks.filter(t=>t._id!==action.payload);
      return { ...state, tasks: nextTasks };
    }
    
    if(action.type === "ASSIGN_TO_TASK"){
      console.log("ASSIGN_TO_TASK", action.payload, state.tasks, action.payload.task)
      const nextTasks = state.tasks.map(task=>{
        //sometimes executed twice, probably due to: https://stackoverflow.com/questions/55055793/react-usereducer-hook-fires-twice-how-to-pass-props-to-reducer 
        if(task._id===action.payload.task){
          if(task.assigned.filter(e=>e.initials === action.payload.person.initials).length===0){
            task.assigned=[...task.assigned].concat({...action.payload.person, completed:false})
          }
        }
        return task;
      })
      return { ...state, tasks: nextTasks };
    }
    if(action.type==="UNASSIGN_FROM_TASK"){
      console.log("UNASSIGN_FROM_TASK")
      const nextTasks = state.tasks.map(task=>{
        if(task._id===action.payload.task){
          task.assigned = [...task.assigned].filter(person=>person.initials!==action.payload.person.initials);
        }
        return task;
      })
      return { ...state, tasks: nextTasks };
    }
    if(action.type==="ADD_TASK"){
      return {...state, tasks:state.tasks.concat(action.payload)}
    }
    if(action.type==="TOGGLE_COMPLETED"){
      const nextTasks = state.tasks.map(task=>{
        if(task._id===action.payload.task){
          task.assigned = action.assigned.map(assignment=>{
            if(assignment.initials===action.payload.person.initials){
              assignment.completed=action.payload.completed
            }
            return assignment
          })
        }
        return task;
      })
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
