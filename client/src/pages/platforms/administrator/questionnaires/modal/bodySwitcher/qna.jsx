import React from "react";
import { MDBInput } from "mdbreact";

export default function Qna({ handleChange, form }) {
  return (
    <MDBInput
      label="Answer"
      value={form.answer}
      onChange={e => handleChange("answer", e.target.value.toLowerCase())}
    />
  );
}
