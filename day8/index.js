const puzzleInput = require("./puzzle-input");

const sampleInput = `30373
25512
65332
33549
35390`;

const splitArr = (arr, index) => {
  const start = [...new Set(arr.splice(0, index))];
  arr.shift();
  const end = [...new Set(arr)];
  return [start, end];
};

const isCellVisible = (field, x, y) => {
  if (
    x === 0 ||
    x === field[y].length - 1 ||
    y === 0 ||
    y === field.length - 1
  ) {
    return true;
  }
  const cell = +field[y][x];
  const col = field.map((row) => row[x]);
  const row = [...field[y]];

  const [startCol, endCol] = splitArr(col, y);
  const [startRow, endRow] = splitArr(row, x);

  return (
    startCol.every((e) => e < cell) ||
    endCol.every((e) => e < cell) ||
    startRow.every((e) => e < cell) ||
    endRow.every((e) => e < cell)
  );
};

const getTotalVisibleTree = (input) => {
  const treeField = input.split("\n").map((e) => e.split(""));

  const visibleField = treeField.map((row, y) =>
    row.map((_, x) => isCellVisible(treeField, x, y))
  );
  return visibleField
    .map((row) => row.filter((e) => e).length)
    .reduce((sum, e) => sum + e);
};

console.log(getTotalVisibleTree(puzzleInput));
