import React, { useState } from "react";
import { useAppContext } from "../context/useApp";
import BoardTile from "./BoardTile";

const Board = () => {
  const { tiles } = useAppContext();
  const { gameOver } = useAppContext();

  return (
    <div className="board-container">
      {tiles.map((tile) => {
        return <BoardTile key={tile} tileNumber={tile} gameOver={gameOver} />;
      })}
    </div>
  );
};

export default Board;
