const puzzleInput = require("./puzzle-input");

const shapeScore = {
  X: 1, // rock
  Y: 2, // paper
  Z: 3, // scissors
};

const roundScore = {
  A: [3, 6, 0], // rock
  B: [0, 3, 6], // paper
  C: [6, 0, 3], // scissors
};

const expectShape = {
  A: ["Z", "X", "Y"],
  B: ["X", "Y", "Z"],
  C: ["Y", "Z", "X"],
};

const getTotalScore = (input) => {
  return input
    .split("\n")
    .map((e) => {
      const [enemy, player] = e.split(" ");
      return roundScore[enemy][shapeScore[player] - 1] + shapeScore[player];
    })
    .reduce((sum, e) => sum + e);
};

const getTotalFantasyScore = (input) => {
  return input
    .split("\n")
    .map((e) => {
      const [enemy, expect] = e.split(" ");
      const player = expectShape[enemy][shapeScore[expect] - 1];
      return roundScore[enemy][shapeScore[player] - 1] + shapeScore[player];
    })
    .reduce((sum, e) => sum + e);
};

console.log(getTotalScore(puzzleInput));
console.log(getTotalFantasyScore(puzzleInput));
