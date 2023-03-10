import React, { useEffect, useState } from "react";
import { useAppContext, useDispatchContext } from "../context/useApp";

const BoardTile = ({ tileNumber, gameOver }) => {
  const dispatch = useDispatchContext();
  const { player1Tiles, player2Tiles, currentPlayerTurn } = useAppContext();
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    if (player1Tiles.length === 0 && player2Tiles.length === 0) {
      setFlag(false);
    }
  }, [player1Tiles, player2Tiles]);

  const handleTileClick = () => {
    if (flag || gameOver) return;
    if (currentPlayerTurn === 1) {
      dispatch({ type: "ADD_TILE_TO_PLAYER1", payload: tileNumber });
    } else {
      dispatch({ type: "ADD_TILE_TO_PLAYER2", payload: tileNumber });
    }
    dispatch({ type: "CHANGE_PLAYER_TURN", payload: currentPlayerTurn });
    setFlag(true);
  };

  const drawShape = () => {
    if (!flag) return <></>;
    if (player1Tiles.includes(tileNumber)) {
      return <span className="x-player"></span>;
    }
    if (player2Tiles.includes(tileNumber)) {
      return <span className="o-player"></span>;
    }
  };

  return (
    <div className="board-tile-container" onClick={handleTileClick}>
      {drawShape()}
    </div>
  );
};

export default BoardTile;
