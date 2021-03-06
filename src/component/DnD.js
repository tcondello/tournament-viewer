import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const finalSpaceCharacters = [
  {
    id: "rose",
    name: "Rose",
    thumb: "https://placekitten.com/g/200/300",
  },
  {
    id: "eleanor",
    name: "Eleanor",
    thumb: "https://placekitten.com/g/200/300",
  },
  {
    id: "amelia",
    name: "Amelia",
    thumb: "https://placekitten.com/g/200/300",
  },
];

export default function DnD() {
  const [characters, updateCharacters] = useState(finalSpaceCharacters);

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(characters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateCharacters(items);
  }
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="characters">
        {(provided) => (
          <ul
            className="characters"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {characters.map(({ id, name, thumb }, index) => {
              return (
                <Draggable key={id} draggableId={id} index={index}>
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <div className="characters-thumb">
                        <img src={thumb} alt={`${name} Thumb`} />
                      </div>
                      <p>{name}</p>
                    </li>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
}
