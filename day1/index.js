const puzzleInput = require("./puzzle-input");

const getMostCalory = (input) => {
  return input
    .split("\n\n")
    .map((e) => e.split("\n").reduce((sum, e) => +sum + +e))
    .sort((a, b) => b - a)[0];
};

const getSumOfTop3Calories = (input) => {
  return input
    .split("\n\n")
    .map((e) => e.split("\n").reduce((sum, e) => +sum + +e))
    .sort((a, b) => b - a)
    .splice(0, 3)
    .reduce((sum, e) => +sum + +e);
};

console.log(getMostCalory(puzzleInput));
console.log(getSumOfTop3Calories(puzzleInput));
