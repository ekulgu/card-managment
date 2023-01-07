import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import Card from "./components/Card/Card";
import Column from "./components/Column/Column";

import "./styles.css";

const initialData = [
  {
    id: uuid(),
    label: "Column 1",
    cards: [
      {
        id: `Card-${uuid()}`,
        title: "Column 1 Card 1",
        description:
          "It allowance prevailed enjoyment in it. Calling observe for..."
      },
      {
        id: `Card-${uuid()}`,
        title: "Column 1 Card 2",
        description:
          "It allowance prevailed enjoyment in it. Calling observe for..."
      },
      {
        id: `Card-${uuid()}`,
        title: "Column 1 Card 3",
        description:
          "It allowance prevailed enjoyment in it. Calling observe for..."
      }
    ]
  },
  {
    id: uuid(),
    label: "Column 2",
    cards: [
      {
        id: `Card-${uuid()}`,
        title: "Column 2 Card 1",
        description:
          "It allowance prevailed enjoyment in it. Calling observe for..."
      }
    ]
  },
  {
    id: uuid(),
    label: "Column 3",
    cards: [
      {
        id: `Card-${uuid()}`,
        title: "Column 3 Card 1",
        description:
          "It allowance prevailed enjoyment in it. Calling observe for..."
      },
      {
        id: `Card-${uuid()}`,
        title: "Column 3 Card 2",
        description:
          "It allowance prevailed enjoyment in it. Calling observe for..."
      }
    ]
  }
];
export default function App() {
  const [data, setData] = useState(initialData);

  const addColumn = () => {
    setData((columns) => [
      ...columns,
      {
        id: uuid(),
        label: `Column ${columns.length + 1}`,
        cards: []
      }
    ]);
  };

  const deleteColumn = (id) => {
    console.log("deleteColumn id", id);
    setData((prevCol) => prevCol.filter((column) => column.id !== id));
  };

  const addCard = (props) => {
    const cardObj = {
      id: `Card-${uuid()}`,
      title: `${props.label} Card ${props.cards.length + 1}`,
      description:
        "It allowance prevailed enjoyment in it. Calling observe for..."
    };

    const newCard = data.map((col) => {
      if (col.id === props.id) {
        return { ...col, cards: col.cards.concat(cardObj) };
      }
      return col;
    });

    console.log("newCard", newCard);
    setData(newCard);
  };

  const moveCard = (cardKey, cardIdx, columnIdx) => {
    let newCardsData = data;
    const element = data[columnIdx].cards[cardIdx];

    switch (cardKey) {
      case "up":
        const up = cardIdx - 1;
        const toUpIndex = up < 0 ? 0 : up;
        data[columnIdx].cards.splice(cardIdx, 1);
        data[columnIdx].cards.splice(toUpIndex, 0, element);
        break;
      case "down":
        const down = cardIdx + 1;
        const toDownIndex = down;
        data[columnIdx].cards.splice(cardIdx, 1);
        data[columnIdx].cards.splice(toDownIndex, 0, element);
        break;
      case "left":
        const left = columnIdx - 1;
        const toLeftIndex = left < 0 ? 0 : left;
        const toEnd = data[toLeftIndex].cards;
        data[columnIdx].cards.splice(cardIdx, 1);
        toEnd.splice(toEnd.length, 0, element);
        break;
      case "right":
        const right = columnIdx + 1;
        const toRightIndex = right;
        const toRightEnd = data[toRightIndex].cards;
        data[columnIdx].cards.splice(cardIdx, 1);
        toRightEnd.splice(toRightEnd.length, 0, element);
        break;
      default:
    }
    setData((prev) => [...(prev = newCardsData)]);
  };

  const moveColumn = (fromIndex, pos) => {
    let newColumnsData = data;
    const toIndex = pos < 0 ? 0 : pos;
    const element = newColumnsData[fromIndex];
    newColumnsData.splice(fromIndex, 1);
    newColumnsData.splice(toIndex, 0, element);

    setData((prev) => [...(prev = newColumnsData)]);
  };

  console.log("data >>", data);

  return (
    <div className="App">
      <h1>Column and Card Counter</h1>
      <button onClick={addColumn}>Add Column</button>
      <div
        style={{
          display: "flex",
          background: "#efefef",
          border: "1px solid #ddd",
          marginTop: "20px"
        }}
      >
        {data.map((props, i) => (
          <Column
            key={i}
            cardComponent={(cards) => (
              <Card
                moveCard={(cardKey, cardIdx) => moveCard(cardKey, cardIdx, i)}
                cards={cards}
              />
            )}
            handleDelete={() => deleteColumn(props.id)}
            addCard={() => addCard(props)}
            moveColumn={(pos) => moveColumn(i, i + pos)}
            {...props}
          />
        ))}
      </div>
    </div>
  );
}
