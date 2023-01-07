import React from "react";

const Column = ({
  label,
  handleDelete,
  cardComponent,
  addCard,
  cards,
  moveColumn
}) => {
  return (
    <div style={ColumnContainer}>
      {label} <button onClick={() => moveColumn(-1)}>{"<"}</button>
      <button onClick={() => moveColumn(1)}>{">"}</button>
      <button onClick={handleDelete}>Delete {label}</button>
      <br />
      <button onClick={addCard}>Add Ticket</button>
      {cardComponent(cards)}
    </div>
  );
};

export default Column;

const ColumnContainer = {
  margin: "0 10px",
  padding: "10px 0",
  height: "auto",
  minWidth: "150px",
  borderLeft: "1px solid #ddd",
  borderRight: "1px solid #ddd",
  background: "#fff"
};
