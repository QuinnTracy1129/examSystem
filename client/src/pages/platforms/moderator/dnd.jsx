import React, { useState } from "react";

export default function DND() {
  const [items, setItems] = useState([
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
    { id: 3, name: "Item 3" },
    { id: 4, name: "Item 4" },
    { id: 5, name: "Item 5" },
  ]);

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("text/plain", index);
  };

  const handleDragOver = e => {
    e.preventDefault();
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    const sourceIndex = e.dataTransfer.getData("text/plain");
    const updatedItems = [...items];
    const [draggedItem] = updatedItems.splice(sourceIndex, 1);
    updatedItems.splice(targetIndex, 0, draggedItem);
    setItems(updatedItems);
  };

  return (
    <ul className="list-group">
      {items.map((item, index) => (
        <li
          className="list-group-item py-1"
          key={item.id}
          onDragStart={e => handleDragStart(e, index)}
          onDragOver={handleDragOver}
          onDrop={e => handleDrop(e, index)}
          draggable
        >
          {item.name}
        </li>
      ))}
    </ul>
  );
}
