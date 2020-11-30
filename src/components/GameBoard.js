import React, { useContext } from "react";
import { store } from "../models/store.js";
import Land from "./Land";
export default function GameBoard(props) {
  const { globalState } = useContext(store);
  const { lands } = globalState;
  return (
    <svg
      viewBox="0 0 1000 1000"
      onClick={props.clickHandler ? props.clickHandler : null}
    >
      {lands.map(land => {
        return (
          <Land
            owner={land.owner}
            troops={land.troops}
            id={land.id}
            key={land.id}
            title={land.title}
            d={land.d}
          />
        );
      })}
    </svg>
  );
}
