//6:37 https://www.youtube.com/watch?v=w-mxeKctUVg

import React, { useState } from "react";
import "./App.css";

const initial = [
  [-1, 5, -1, 9, -1, -1, -1, -1, -1],
  [8, -1, -1, -1, 4, -1, 3, -1, 7],
  [-1, -1, -1, 2, 8, -1, 1, 9, -1],
  [5, 3, 8, 6, -1, 7, 9, 4, -1],
  [-1, 2, -1, 3, -1, 1, -1, -1, -1],
  [1, -1, 9, 8, -1, 4, 6, 2, 3],
  [9, -1, 7, 4, -1, -1, -1, -1, -1],
  [-1, 4, 5, -1, -1, -1, 2, -1, 9],
  [-1, -1, -1, -1, 3, -1, -1, 7, -1],
];

function App() {
  const [sudokuArr, setSudokuArr] = useState(getDeepCopy(initial));

  function getDeepCopy(arr) {
    return JSON.parse(JSON.stringify(arr));
  }

  function onInputChange(e, row, col) {
    console.log("tomii");
    var val = parseInt(e.target.value) || -1,
      grid = getDeepCopy(sudokuArr);
    //Input value should range from 1-9 and for empty cell it should be -1
    if (val === -1 || (val >= 1 && val <= 9)) {
      grid[row][col] = val;
    }
    setSudokuArr(grid);

    function checkSudoku() {
      //function
    }

    function checkCol(grid, row, num) {
      return grid[row].indexOf(num === -1);
    }

    function checkRow(grid, col, num) {
      return grid.map((row) => row[col].indexOf(num) === -1);
    }

    function checkSquare() {
      let boxArr = [],
        rowStart = row - (row % 3),
        colStart = col(col % 3);
    }

    function checkValid(grid, row, col, num) {
      //num should be unique in row, col and square 3x3
      if (checkRow(grid, row, num) && checkCol(grid, col, num) && checkSquare) {
        return true;
      }
    }

    function solver(grid, row = 0, col = 0) {
      for (let num = 1; num <= 9; num++) {
        //check is good
        if (checkValid(grid, row, col, num)) {
          //fill the num in that cell
        }
      }
    }
    function solveSudoku() {
      //function
      let sudoku = getDeepCopy(initial);
      solver(sudoku);
    }

    function resetSudoku() {
      //function
    }
  }
  return (
    <div className="App">
      <div className="App-header">
        <h3>Sudoku app</h3>
        <table>
          <tbody>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((row, rIndex) => {
              return (
                <tr
                  key={rIndex}
                  className={(row + 1) % 3 === 0 ? "bBorder" : ""}
                >
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((col, cIndex) => {
                    return (
                      <td
                        key={rIndex + cIndex}
                        className={(col + 1) % 3 === 0 ? "rBorder" : ""}
                      >
                        <input
                          onChange={(e) => onInputChange(e, row, col)}
                          value={
                            sudokuArr[row][col] === -1
                              ? ""
                              : sudokuArr[row][col]
                          }
                          className="cellInput"
                          disabled={initial[row][col] !== -1}
                        ></input>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="buttonContainer">
          <button className="checkButton button" onClick="checkSudoku">
            Check
          </button>
          <button className="solveButton button" onClick="solveSudoku">
            Solve
          </button>
          <button className="resetButton button" onClick="resetSudoku">
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
