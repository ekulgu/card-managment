import React from "react";

const Card = (props) => {
  // console.log("props cards >>>", props);
  return (
    props.cards &&
    props.cards.map(({ id, title, description }, idx) => (
      <div key={id} style={CardContainer}>
        <h2>{title}</h2>
        <p style={Text}>{description}</p>
        <div style={{ textAlign: "center" }}>
          <button onClick={() => props.moveCard("up", idx)}>Up</button>
          <br />
          <button onClick={() => props.moveCard("left", idx)}>Left</button>
          <button onClick={() => props.moveCard("right", idx)}>Right</button>
          <br />
          <button onClick={() => props.moveCard("down", idx)}>Down</button>
        </div>
      </div>
    ))
  );
};

export default Card;

const CardContainer = {
  border: "1px solid #ddd",
  borderRadius: "4px",
  background: "#ddd",
  margin: "15px",
  padding: "15px"
};

const Text = {
  color: "blue"
};
