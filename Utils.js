Array.prototype.sliceWithStep = function (start, end, step = 1) {
  return this.slice(start, end).reduce(
    (acc, e, i) => (i % step == 0 ? [...acc, e] : acc),
    []
  );
};

export function calcIndex(row, column) {
  return row * 3 + column;
}

export function checkWinner(board) {
  const allEqual = (arr) => {
    if (arr.every((val) => val === arr[0])) {
      return arr[0];
    }

    return null;
  };

  for (let i = 0; i < 3; i++) {
    const winner = allEqual(board.slice(i * 3, i * 3 + 3));
    if ((winner === "x") | (winner === "o")) {
      return winner;
    }
  }

  for (let i = 0; i < 3; i++) {
    const winner = allEqual(board.sliceWithStep(i, 9, 3));
    if ((winner === "x") | (winner === "o")) {
      return winner;
    }
  }

  const diag1Winner = allEqual(board.sliceWithStep(0, 9, 4));
  if ((diag1Winner === "x") | (diag1Winner === "o")) {
    return diag1Winner;
  }

  const diag2Winner = allEqual(board.sliceWithStep(2, 8, 2));
  if ((diag2Winner === "x") | (diag2Winner === "o")) {
    return diag2Winner;
  }

  if (board.every((cell) => cell !== null)) {
    return "draw";
  }

  return null;
}
