import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import Button from "./components/Button";
import Cell from "./components/Cell";

Array.prototype.sliceWithStep = function (start, end, step = 1) {
  return this.slice(start, end).reduce(
    (acc, e, i) => (i % step == 0 ? [...acc, e] : acc),
    []
  );
};

function calcIndex(row, column) {
  return row * 3 + column;
}

function checkWinner(board) {
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

export default function App() {
  const [currentBoard, setNewBoard] = useState(Array(9).fill(null));
  const [currentTurn, setCurrentTurn] = useState("x");

  const resetBoard = () => {
    setNewBoard(Array(9).fill(null));
    setCurrentTurn("o");
  };

  const makeMove = (row, column) => {
    const index = calcIndex(row, column);
    if (currentBoard[index] !== null) {
      return;
    }
    currentBoard[index] = currentTurn;

    setCurrentTurn(currentTurn === "x" ? "o" : "x");
    setNewBoard([...currentBoard]);

    const winner = checkWinner(currentBoard);
    if (winner !== null) {
      Alert.alert("Game ended", `Winner: ${winner.toUpperCase()}`, [
        {
          text: "New Game",
          onPress: resetBoard,
        },
      ]);
    }
  };

  const drawRow = (row) => {
    return Array(3)
      .fill(0)
      .map((_, column) => {
        const rightBorder = column !== 2;
        const bottomBorder = row !== 2;

        return (
          <Cell
            key={column}
            cell={currentBoard[calcIndex(row, column)]}
            onPress={() => makeMove(row, column)}
            rightBorder={rightBorder}
            bottomBorder={bottomBorder}
          />
        );
      });
  };
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View>
        {Array(3)
          .fill(0)
          .map((_, index) => {
            return (
              <View key={index} style={styles.row}>
                {drawRow(index)}
              </View>
            );
          })}
      </View>

      <Button style={{ marginTop: 20 }} title="Reset" onPress={resetBoard} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
  },
});
