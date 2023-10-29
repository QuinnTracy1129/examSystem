import { MDBInput } from "mdbreact";
import React from "react";

export default function Qna({ handleChange, index, result }) {
  const { answer = "" } = result;

  return (
    <MDBInput
      label="Your Answer"
      value={answer}
      onChange={e =>
        handleChange("answer", e.target.value.toLowerCase(), index)
      }
      rows={5}
      type="textarea"
      outline
    />
  );
}
