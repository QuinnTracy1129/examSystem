import React from "react";
import { MDBInput } from "mdbreact";

export default function Enum({ handleChange, form }) {
  const addAnswers = (value, index) => {
    const _answer = [...form.answer];

    _answer[index] = value;

    if (_answer[_answer.length - 1]) {
      _answer.push("");
    }

    handleChange("answer", _answer);
  };

  const { answer = [] } = form,
    _answer = typeof answer === "string" ? [] : answer;

  return _answer?.map((choice, index) => (
    <MDBInput
      key={`choice-${index}`}
      label={`Answer #${index + 1}`}
      value={choice}
      onChange={e => addAnswers(e.target.value.toLowerCase(), index)}
    />
  ));
}
