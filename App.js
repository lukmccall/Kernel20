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
    backgroundColor: "#242d34",
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
  },
});
