import { MDBInput } from "mdbreact";
import React from "react";

export default function Enum({ handleChange, index, result }) {
  const { answer = [] } = result;

  return answer.map((input, i) => (
    <MDBInput
      value={input}
      onChange={e => {
        const _answer = [...answer];
        _answer[i] = e.target.value.toLowerCase();
        handleChange("answer", _answer, index);
      }}
      key={`mc-${i}`}
      label={`Answer #${i + 1}`}
      type="text"
      outline
    />
  ));
}
