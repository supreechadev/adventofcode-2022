const puzzleInput = require("./puzzle-input");

const getSum = (input) => {
  return input
    .split("\n")
    .map((e) => {
      const half = e.length / 2;
      const left = [...new Set(e.slice(0, half))];
      const right = [...new Set(e.slice(half))];
      return right.find((char) => left.includes(char));
    })
    .reduce((sum, e) => {
      const code = e.charCodeAt();
      const value = code > 90 ? code - 96 : code - 38;
      return sum + value;
    }, 0);
};

const getGroupSum = (input) => {
  return input
    .split("\n")
    .reduce((arr, e, index) => {
      const chunkIndex = Math.floor(index / 3);
      if (!arr[chunkIndex]) arr[chunkIndex] = [];
      arr[chunkIndex].push([...new Set(e)]);
      return arr;
    }, [])
    .map((e) => e[2].find((char) => e[0].includes(char) && e[1].includes(char)))
    .reduce((sum, e) => {
      const code = e.charCodeAt();
      const value = code > 90 ? code - 96 : code - 38;
      return sum + value;
    }, 0);
};

console.log(getSum(puzzleInput));
console.log(getGroupSum(puzzleInput));
