const puzzleInput = require("./puzzle-input");

const getStacks = () => [
  ["G", "F", "V", "H", "P", "S"],
  ["G", "J", "F", "B", "V", "D", "Z", "M"],
  ["G", "M", "L", "J", "M"],
  ["N", "G", "Z", "V", "D", "W", "P"],
  ["V", "R", "C", "B"],
  ["V", "R", "S", "M", "P", "W", "L", "Z"],
  ["T", "H", "P"],
  ["Q", "R", "S", "N", "C", "H", "Z", "V"],
  ["F", "L", "G", "P", "V", "Q", "J"],
];

const getOnTopMoveEach = (stacks, input) => {
  input
    .split("\n")
    .map((e) => e.split(" ").filter((_, index) => index % 2 === 1))
    .forEach((e) => {
      const [amount, form, to] = e;
      const formStacks = stacks[form - 1];
      const toStacks = stacks[to - 1];
      const payload = formStacks.splice(formStacks.length - amount);
      stacks[to - 1] = [...toStacks, ...payload.reverse()];
    });

  return stacks.map((e) => e[e.length - 1]).join("");
};

const getOnTopMoveAll = (stacks, input) => {
  input
    .split("\n")
    .map((e) => e.split(" ").filter((_, index) => index % 2 === 1))
    .forEach((e) => {
      const [amount, form, to] = e;
      const formStacks = stacks[form - 1];
      const toStacks = stacks[to - 1];
      const payload = formStacks.splice(formStacks.length - amount);
      stacks[to - 1] = [...toStacks, ...payload];
    });

  return stacks.map((e) => e[e.length - 1]).join("");
};

console.log(getOnTopMoveEach(getStacks(), puzzleInput));
console.log(getOnTopMoveAll(getStacks(), puzzleInput));
