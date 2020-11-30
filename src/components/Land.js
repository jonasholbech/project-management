import React from "react";

export default function Land(props) {
  return (
    <path
      id={props.id}
      title={props.title}
      data-owner={props.owner}
      className={"land land" + (props.owner !== "" ? props.owner : "")}
      d={props.d}
    />
  );
}
