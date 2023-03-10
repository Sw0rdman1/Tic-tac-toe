const winningCombinations = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

export const isUserWinner = (userTiles) => {
  let flag = false;
  winningCombinations.forEach((winningCombination) => {
    const containsAll = winningCombination.every((element) => {
      return userTiles.includes(element);
    });
    if (containsAll) {
      flag = true;
    }
  });
  return flag;
};
