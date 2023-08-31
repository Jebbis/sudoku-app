export function parseSudokuString(sudokuString) {
  const rows = sudokuString.match(/.{1,9}/g);
  return rows.map((row) =>
    row.split("").map((cell) => (cell === "." ? null : parseInt(cell)))
  );
}

export function validateSudoku(grid) {
  // Validate rows
  for (let row = 0; row < 9; row++) {
    if (!isValidSet(grid[row])) {
      return false;
    }
  }

  // Validate columns
  for (let col = 0; col < 9; col++) {
    const column = [];
    for (let row = 0; row < 9; row++) {
      column.push(grid[row][col]);
    }
    if (!isValidSet(column)) {
      return false;
    }
  }

  // Validate subgrids
  for (let row = 0; row < 9; row += 3) {
    for (let col = 0; col < 9; col += 3) {
      const subgrid = [];
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
          subgrid.push(grid[row + r][col + c]);
        }
      }
      if (!isValidSet(subgrid)) {
        return false;
      }
    }
  }

  return true;
}

function isValidSet(values) {
  const seen = new Set();
  for (const value of values) {
    if (value !== null && seen.has(value)) {
      return false;
    }
    seen.add(value);
  }
  return true;
}
