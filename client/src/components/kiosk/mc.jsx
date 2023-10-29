import React from "react";
import { MDBIcon } from "mdbreact";

export default function Mc({ handleChange, index, result }) {
  const { answer, choices } = result;

  return choices.map((choice, i) => (
    <p
      key={`${choice}-${i}`}
      onClick={() => handleChange("answer", choice, index)}
      className="cursor-pointer"
    >
      <MDBIcon
        icon={choice === answer ? "check-square" : "square"}
        far={choice !== answer}
        className="mr-2"
      />
      {choice}
    </p>
  ));
}
