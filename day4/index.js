const puzzleInput = require("./puzzle-input");

const getCountOfFullyContain = (input) => {
  return input
    .split("\n")
    .map((e) => {
      const [left, right] = e.split(",");
      const [startLeft, endLeft] = left.split("-");
      const [startRight, endRight] = right.split("-");
      return (
        (+startLeft >= +startRight && +endLeft <= +endRight) ||
        (+startRight >= +startLeft && +endRight <= +endLeft)
      );
    })
    .filter((e) => e).length;
};

const getCountOfOverlap = (input) => {
  return input
    .split("\n")
    .map((e) => {
      const [left, right] = e.split(",");
      const [startLeft, endLeft] = left.split("-");
      const [startRight, endRight] = right.split("-");
      return (
        (+startLeft <= +endRight && +endLeft >= +startRight) ||
        (+startRight <= +endLeft && +endRight >= +startLeft)
      );
    })
    .filter((e) => e).length;
};

console.log(getCountOfFullyContain(puzzleInput));
console.log(getCountOfOverlap(puzzleInput));
