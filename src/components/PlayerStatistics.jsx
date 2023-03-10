import React from "react";

const PlayerStatistics = ({ playerName, playerScore, playerColor }) => {
  return (
    <div
      className={
        playerColor === "red"
          ? "player-statistics-container red-player"
          : "player-statistics-container blue-player"
      }
    >
      <h2 className="player-name">{playerName}</h2>
      <h2 className="player-score">{playerScore}</h2>
    </div>
  );
};

export default PlayerStatistics;
