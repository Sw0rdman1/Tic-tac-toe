import React from "react";
import { useAppContext, useDispatchContext } from "../context/useApp";
import Board from "./Board";
import PlayerStatistics from "./PlayerStatistics";

const MainSection = () => {
  const { resultText, player1, player2 } = useAppContext();
  const dispatch = useDispatchContext();

  const restartBoard = () => {
    dispatch({ type: "RESET_BOARD" });
  };

  return (
    <div className="main-section-container">
      <PlayerStatistics
        playerColor={"red"}
        playerScore={player1.score}
        playerName={player1.name}
      />
      <div className="middle-part-section">
        <div className="main-section-result">
          {resultText ? (
            <>
              <h2> {resultText}</h2>{" "}
              <button onClick={restartBoard}>Restart</button>{" "}
            </>
          ) : (
            <></>
          )}
        </div>
        <Board />
      </div>
      <PlayerStatistics
        playerColor={"blue"}
        playerScore={player2.score}
        playerName={player2.name}
      />
    </div>
  );
};

export default MainSection;
