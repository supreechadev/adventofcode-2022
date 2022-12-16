const puzzleInput = require("./puzzle-input");

const sampleInput = `30373
25512
65332
33549
35390`;

const splitArr = (arr, index) => {
  const start = arr.splice(0, index);
  arr.shift();
  const end = arr;
  return [start, end];
};

const getResource = (field, x, y) => {
  const cell = +field[y][x];
  const col = field.map((row) => row[x]);
  const row = [...field[y]];

  const [startCol, endCol] = splitArr(col, y);
  const [startRow, endRow] = splitArr(row, x);
  return { cell, startCol, endCol, startRow, endRow };
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

  const { cell, startCol, endCol, startRow, endRow } = getResource(field, x, y);

  return (
    startCol.every((e) => e < cell) ||
    endCol.every((e) => e < cell) ||
    startRow.every((e) => e < cell) ||
    endRow.every((e) => e < cell)
  );
};

const getCellVisionArea = (field, x, y) => {
  const { cell, startCol, endCol, startRow, endRow } = getResource(field, x, y);
  startCol.reverse();
  startRow.reverse();

  let topScore = startCol.findIndex((e) => e >= cell);
  let rightScore = endRow.findIndex((e) => e >= cell);
  let bottomScore = endCol.findIndex((e) => e >= cell);
  let leftScore = startRow.findIndex((e) => e >= cell);

  topScore = topScore >= 0 ? topScore + 1 : startCol.length;
  rightScore = rightScore >= 0 ? rightScore + 1 : endRow.length;
  bottomScore = bottomScore >= 0 ? bottomScore + 1 : endCol.length;
  leftScore = leftScore >= 0 ? leftScore + 1 : startRow.length;

  return topScore * leftScore * rightScore * bottomScore;
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

const getMostVisionAreaTree = (input) => {
  const treeField = input.split("\n").map((e) => e.split(""));

  const visionAreaField = treeField.map((row, y) =>
    row.map((_, x) => getCellVisionArea(treeField, x, y))
  );

  return Math.max(...[...new Set(visionAreaField.flat())]);
};

console.log(getTotalVisibleTree(puzzleInput));
console.log(getMostVisionAreaTree(puzzleInput));
