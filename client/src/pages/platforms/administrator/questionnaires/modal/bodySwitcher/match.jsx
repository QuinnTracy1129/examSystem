import React from "react";
import { MDBCol, MDBInput, MDBRow } from "mdbreact";

export default function Match({ handleChange, form, setForm }) {
  const addChoices = (value, index) => {
    const _choices = [...form.choices],
      _answer = [...form.answer];

    _choices[index] = value;

    if (_choices[_choices.length - 1].value) {
      const item = { id: index + 2, value: "" };
      _choices.push(item);
      _answer.push(item);
    }

    setForm(prev => ({ ...prev, answer: _answer, choices: _choices }));
  };

  const { answer = [], choices = [] } = form,
    _answer = typeof answer === "string" ? [] : answer;

  return (
    <MDBRow>
      <MDBCol size="6">
        {_answer?.map((item, index) => (
          <MDBInput
            key={`answer-${index}`}
            label={`item #${index + 1}`}
            value={item.value}
            onChange={e => {
              const _answer = [...answer];
              _answer[index] = {
                id: index + 1,
                value: e.target.value.toLowerCase(),
              };
              handleChange("answer", _answer);
            }}
          />
        ))}
      </MDBCol>
      <MDBCol size="6">
        {choices?.map((choice, index) => {
          var label = `Answer of item #${index + 1}`;

          if (!answer[index].value && index !== 0) label = "Nuisance";

          return (
            <MDBInput
              key={`choice-${index}`}
              label={label}
              value={choice.value}
              onChange={e =>
                addChoices(
                  {
                    id: index + 1,
                    value: e.target.value.toLowerCase(),
                  },
                  index
                )
              }
            />
          );
        })}
      </MDBCol>
    </MDBRow>
  );
}
