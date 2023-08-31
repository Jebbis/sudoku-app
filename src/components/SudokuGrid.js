import React, { useState } from "react";
import { parseSudokuString, validateSudoku } from "../utils/sudokuUtils";
import "./SudokuGrid.css";
import puzzlesData from "../puzzlesData";

function SudokuGrid() {
  const puzzleStrings = puzzlesData.trim().split("\n");
  const puzzles = puzzleStrings.map(parseSudokuString);

  const initialGrid = puzzles[0]; // Load the first puzzle initially
  const [grid, setGrid] = useState(initialGrid);

  const handleCellChange = (rowIndex, columnIndex, value, target) => {
    console.log(target);
    console.log(rowIndex, columnIndex);
    console.log(value);
    console.log(grid);

    if (isNaN(value)) {
      value = null;
    }

    const newGrid = [...grid];
    newGrid[rowIndex][columnIndex] = value;
    setGrid(newGrid);

    //Check if the number is valid for that position
    if (!validateSudoku(grid)) {
      target.classList.add("invalid-cell");
    } else {
      target.classList.remove("invalid-cell");
    }
  };

  const handleNewGame = () => {
    const randomIndex = Math.floor(Math.random() * puzzles.length);
    const newPuzzle = puzzles[randomIndex];
    setGrid(newPuzzle);
  };

  return (
    <div>
      <div className="sudoku-grid">
        {grid.map((row, rowIndex) =>
          row.map((value, columnIndex) => (
            <input
              key={`${rowIndex}-${columnIndex}`}
              className={`sudoku-cell`(rowIndex + 1) % 3 === 0 ? "bBorder" : ""}
              type="text"
              value={value || ""}
              onChange={(e) =>
                handleCellChange(
                  rowIndex,
                  columnIndex,
                  parseInt(e.target.value),
                  e.target || null
                )
              }
            />
          ))
        )}
      </div>
      <button onClick={handleNewGame}>New Game</button>
    </div>
  );
}

export default SudokuGrid;
