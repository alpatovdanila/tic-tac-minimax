import React from "react";
import { BoardCell } from "./BoardCell";
import { BoardRow } from "./BoardRow";

export const Board = ({ state, onCellClick, terminal }) => {
  const { width, height, stones } = state;

  return (
    <div className={`board ${terminal ? " board_terminal" : ""}`}>
      {Array.from({ length: height }, (_, i) => i).map(rowIndex => (
        <BoardRow key={rowIndex}>
          {Array.from({ length: width }, (_, i) => i).map(cellIndex => (
            <BoardCell
              key={cellIndex}
              onClick={() => onCellClick(rowIndex * width + cellIndex)}
            >
              {!!stones[rowIndex * width + cellIndex]
                ? stones[rowIndex * width + cellIndex].component
                : null}
            </BoardCell>
          ))}
        </BoardRow>
      ))}
    </div>
  );
};
