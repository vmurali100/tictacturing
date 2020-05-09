import { UPDATE_BOARD, UPDATE_WINNER, UPDATE_WINNER_COUNT } from "./actions";

let defaultState = {
  board: Array(9).fill(null),
  player: "X",
  winner: null,
  player1WinningCount: Array(6).fill(null),
  player2WinningCount: Array(6).fill(null),
};

export function rootReducer(state = defaultState, action) {
  switch (action.type) {
    case UPDATE_BOARD:
      return {
        ...state,
        player: action.payLoad.player,
        board: action.payLoad.board,
      };

    case UPDATE_WINNER:
      return {
        ...state,
        winner: action.payLoad.winner,
        board: action.payLoad.board,
      };
    case UPDATE_WINNER_COUNT:
      if (action.payLoad.winnerName == "X") {
        return {
          ...state,
          player1WinningCount: action.payLoad.WinningCount,
        };
      } else {
        return {
          ...state,
          player2WinningCount: action.payLoad.WinningCount,
        };
      }

    default:
      return defaultState;
  }
}
