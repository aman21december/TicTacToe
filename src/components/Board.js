import React from "react";
import Square from "./Square";

const Board = ({ board, onClick }) => {
  const boardSize = board.length;
  return (
    <div className="flex justify-center items-center w-full px-2">
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${boardSize}, minmax(0, 1fr))`,
          maxWidth: '90vmin', // keeps board square and centered
          width: '100%',
        }}
      >
        {board.map((row, i) =>
          row.map((cell, j) => (
            <Square
              key={`${i}-${j}`}
              value={cell}
              onClick={() => onClick(i, j)}
            />
          ))
        )}
      </div>
    </div>
  );
};


export default Board;
