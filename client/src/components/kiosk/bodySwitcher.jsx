import React from "react";
import Enum from "./enum";
import Mc from "./mc";
import Match from "./match";
import Qna from "./qna";

const componentMap = {
  enum: Enum,
  mc: Mc,
  match: Match,
  qna: Qna,
};

export default function BodySwitcher({ type, handleChange, result, index }) {
  const Component = componentMap[type];
  //handleChange is used by direct changes
  //setForm is used by match, to update 2 keys at the same time
  return (
    <Component index={index} result={result} handleChange={handleChange} />
  );
}
