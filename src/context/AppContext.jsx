import React, { createContext, useReducer } from "react";
import { isUserWinner } from "../utility/helperFunctions";

const initialState = {
  tiles: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  sumOfTilesOcuppiend: 0,
  player1: {
    name: "Player 1",
    score: 0,
  },
  player2: {
    name: "Player 2",
    score: 0,
  },
  player1Tiles: [],
  player2Tiles: [],
  currentPlayerTurn: 1,
  resultText: "",
  gameOver: false,
};

export const AppContext = createContext();
export const AppDispatchContext = createContext();

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppContext.Provider>
  );
};

export const appReducer = (state, action) => {
  const generateResult = (sum, player, tiles) => {
    if (sum === 45) {
      return {
        resultText: "Draw!",
        gameOver: true,
        player1: state.player1,
        player2: state.player2,
      };
    }
    if (isUserWinner(tiles) && player === 1) {
      return {
        resultText: "User 1 is a winner!",
        gameOver: true,
        player1: { ...state.player1, score: state.player1.score + 1 },
      };
    }
    if (isUserWinner(tiles) && player === 2) {
      return {
        resultText: "User 2 is a winner!",
        gameOver: true,
        player2: { ...state.player2, score: state.player2.score + 1 },
      };
    }
    return {
      resultText: "",
      gameOver: false,
      player1: state.player1,
      player2: state.player2,
    };
  };
  switch (action.type) {
    case "CHANGE_PLAYER_TURN":
      return {
        ...state,
        currentPlayerTurn: action.payload === 1 ? 2 : 1,
      };
    case "ADD_TILE_TO_PLAYER1":
      const newTiles = [...state.player1Tiles, action.payload];
      return {
        ...state,
        player1Tiles: newTiles,
        sumOfTilesOcuppiend: state.sumOfTilesOcuppiend + action.payload,
        resultText: generateResult(
          state.sumOfTilesOcuppiend + action.payload,
          1,
          newTiles
        ).resultText,
        gameOver: generateResult(
          state.sumOfTilesOcuppiend + action.payload,
          1,
          newTiles
        ).gameOver,
        player1: generateResult(
          state.sumOfTilesOcuppiend + action.payload,
          1,
          newTiles
        ).player1,
      };
    case "ADD_TILE_TO_PLAYER2":
      const newTiles2 = [...state.player2Tiles, action.payload];

      return {
        ...state,
        player2Tiles: newTiles2,
        sumOfTilesOcuppiend: state.sumOfTilesOcuppiend + action.payload,
        resultText: generateResult(
          state.sumOfTilesOcuppiend + action.payload,
          2,
          newTiles2
        ).resultText,
        gameOver: generateResult(
          state.sumOfTilesOcuppiend + action.payload,
          2,
          newTiles2
        ).gameOver,
        player2: generateResult(
          state.sumOfTilesOcuppiend + action.payload,
          2,
          newTiles2
        ).player2,
      };

    case "RESET_BOARD":
      return {
        ...state,
        sumOfTilesOcuppiend: 0,
        player1Tiles: [],
        player2Tiles: [],
        currentPlayerTurn: 1,
        resultText: "",
        gameOver: false,
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
