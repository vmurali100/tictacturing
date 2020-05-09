export const UPDATE_BOARD = "UPDATE_BOARD";
export const UPDATE_WINNER = "UPDATE_WINNER";
export const UPDATE_WINNER_COUNT = "UPDATE_WINNER_COUNT";
export function updateBoard(payLoad) {
  console.log(payLoad);
  const action = {
    type: UPDATE_BOARD,
    payLoad,
  };
  return action;
}

export function updateWinner(payLoad) {
  const action = {
    type: UPDATE_WINNER,
    payLoad,
  };
  return action;
}

export function updateWinnerCount(payLoad) {
  const action = {
    type: UPDATE_WINNER_COUNT,
    payLoad,
  };
  return action;
}
