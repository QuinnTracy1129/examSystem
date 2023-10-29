import React from "react";
import { MDBInput } from "mdbreact";

const str = "ABCD";

export default function Mc({ handleChange, form }) {
  const { choices = [], answer } = form;

  return choices.map((choice, index) => (
    <MDBInput
      key={`choice-${index}`}
      label={str[index]}
      icon={
        typeof answer === "number"
          ? !index
            ? "check"
            : "times"
          : choice === answer
          ? "check"
          : "times"
      }
      onIconClick={() => handleChange("answer", choice)}
      value={choice}
      onChange={e => {
        const _choices = [...choices];
        _choices[index] = e.target.value.toLowerCase();
        handleChange("choices", _choices);
      }}
    />
  ));
}
