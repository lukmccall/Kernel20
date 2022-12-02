import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { calcIndex, checkWinner } from "./Utils";
import Button from "./components/Button";
import Cell from "./components/Cell";

export default function App() {
  const [currentBoard, setNewBoard] = useState(Array(9).fill(null));
  const [currentTurn, setCurrentTurn] = useState("x");

  const resetBoard = () => {
    setNewBoard(Array(9).fill(null));
    setCurrentTurn("x");
  };

  const makeMove = (row, column) => {
    const index = calcIndex(row, column);
    if (currentBoard[index] !== null) {
      return;
    }
    currentBoard[index] = currentTurn;

    setCurrentTurn(currentTurn === "x" ? "o" : "x");
    setNewBoard([...currentBoard]);
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#242d34",
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
  },
});
