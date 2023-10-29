import React from "react";
import { MDBCol, MDBListGroup, MDBListGroupItem, MDBRow } from "mdbreact";

export default function Match({ handleChange, index, result }) {
  const { answer, choices } = result;

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("text/plain", index);
  };

  const handleDragOver = e => {
    e.preventDefault();
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    const sourceIndex = e.dataTransfer.getData("text/plain");
    const updatedItems = [...choices];
    const [draggedItem] = updatedItems.splice(sourceIndex, 1);
    updatedItems.splice(targetIndex, 0, draggedItem);
    handleChange("choices", updatedItems, index);
  };

  return (
    <>
      <MDBRow>
        <MDBCol>
          <MDBListGroup>
            {answer.map(({ id, value }, i) => (
              <MDBListGroupItem key={`${id}-${i}`} className="py-1">
                {value}
              </MDBListGroupItem>
            ))}
          </MDBListGroup>
        </MDBCol>
        <MDBCol>
          <ul className="list-group">
            {choices.map((item, i) => (
              <li
                className="list-group-item py-1"
                key={`${item.value}-${i}`}
                onDragStart={e => handleDragStart(e, i)}
                onDragOver={handleDragOver}
                onDrop={e => handleDrop(e, i)}
                draggable
              >
                {item.value}
              </li>
            ))}
          </ul>
        </MDBCol>
      </MDBRow>
    </>
  );
}
