import React, { useState, useEffect } from "react";
import "./App.css";
import { transformedArray } from "./puzzlesData";

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
  const [startingArr, setStartingArr] = useState(getDeepCopy(initial));
  const [puzzleIndex, setPuzzleIndex] = useState(0);

  /*   console.log(startingArr);
  console.log(sudokuArr); */

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
  }

  function compareSudokus(currentSudoku, solvedSudoku) {
    console.log(`solved: ${solvedSudoku}`);
    console.log(`now: ${currentSudoku}`);
    let res = {
      isComplete: true,
      isSolvable: true,
    };
    for (var i = 0; i < 9; i++) {
      for (var j = 0; j < 9; j++) {
        /*                  console.log(`Current: ${currentSudoku[i][j]}`);
        console.log(`Solved: ${solvedSudoku[i][j]}`); */
        console.log(`isComplete: ${res.isComplete}`);
        /*         console.log(`isSolvable: ${res.isSolvable}`);
        console.log(`solved: ${solvedSudoku}`);
        console.log(`now: ${currentSudoku}`);  */
        if (currentSudoku[i][j] !== solvedSudoku[i][j]) {
          if (currentSudoku[i][j] !== -1) {
            res.isSolvable = false;
          }
          res.isComplete = false;
        }
      }
    }
    return res;
  }

  function checkSudoku() {
    let solvedSudoku = getDeepCopy(startingArr);
    console.log(`before solver${solvedSudoku}`);
    solver(solvedSudoku);
    console.log(`after solver${solvedSudoku}`);
    let compare = compareSudokus(sudokuArr, solvedSudoku);
    if (compare.isComplete) {
      alert("Congratulations! You have solved Sudoku!");
    } else if (compare.isSolvable) {
      alert("Keep going!");
    } else {
      alert("Sudoku can't be solved, try again!");
    }
  }

  function checkRow(grid, row, num) {
    return grid[row].indexOf(num) === -1;
  }

  function checkCol(grid, col, num) {
    return grid.map((row) => row[col]).indexOf(num) === -1;
  }

  function checkSquare(grid, row, col, num) {
    let boxArr = [],
      rowStart = row - (row % 3),
      colStart = col - (col % 3);
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        //get all the cell numnbers and push to boxarr
        boxArr.push(grid[rowStart + i][colStart + j]);
      }
    }
    return boxArr.indexOf(num) === -1;
  }

  function checkValid(grid, row, col, num) {
    //num should be unique in row, col and square 3x3
    if (
      checkRow(grid, row, num) &&
      checkCol(grid, col, num) &&
      checkSquare(grid, row, col, num)
    ) {
      return true;
    }
  }

  function getNext(row, col) {
    //if col reaches 8, increase row number
    //if row reaches 8 and col reaches 8, next will be [null,null]
    //if col doesnt reach 8, increase col number

    return col !== 8 ? [row, col + 1] : row !== 8 ? [row + 1, 0] : [null, null];
  }

  function solver(grid, row = 0, col = 0) {
    //if the current cell is already filled, move to next cell
    if (grid[row][col] !== -1) {
      //for last cell, dont solve it
      let isLast = row >= 8 && col >= 8;
      if (!isLast) {
        let [newRow, newCol] = getNext(row, col);
        return solver(grid, newRow, newCol);
      }
    }

    for (let num = 1; num <= 9; num++) {
      //check is good
      if (checkValid(grid, row, col, num)) {
        //fill the num in that cell
        grid[row][col] = num;
        let [newRow, newCol] = getNext(row, col);

        if (newRow === null || newCol === null) {
          return true;
        }

        if (solver(grid, newRow, newCol)) {
          return true;
        }
      }
    }
    //if its valid fill with -1
    grid[row][col] = -1;
    return false;
  }

  function solveSudoku() {
    let sudoku = getDeepCopy(sudokuArr);
    solver(sudoku);
    console.log(sudoku);
    setSudokuArr(sudoku);
  }

  function resetSudoku() {
    let sudoku = getDeepCopy(initial);
    setSudokuArr(sudoku);
  }

  function newSudoku() {
    const newPuzzleIndex = Math.floor(Math.random() * transformedArray.length);
    setPuzzleIndex(newPuzzleIndex);
    setSudokuArr(getDeepCopy(transformedArray[newPuzzleIndex]));
  }

  useEffect(() => {
    setStartingArr(sudokuArr);
  }, [sudokuArr]);

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
                          disabled={sudokuArr[row][col] !== -1}
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
          <button className="checkButton button" onClick={checkSudoku}>
            Check
          </button>
          <button className="solveButton button" onClick={solveSudoku}>
            Solve
          </button>
          <button className="resetButton button" onClick={resetSudoku}>
            Reset
          </button>
          <button className="newButton button" onClick={newSudoku}>
            New Game
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
