const puzzleInput = require("./puzzle-input");

const getTotalCharacterNeedToBeProcessed = (input, startOfPackageAmount) => {
  const startOfPackage = [];
  for (let i = 0; i < input.length; i++) {
    if (startOfPackage.length < startOfPackageAmount) {
      startOfPackage.push(input[i]);
    } else {
      if ([...new Set(startOfPackage)].length === startOfPackageAmount)
        return i;
      startOfPackage.shift();
      startOfPackage.push(input[i]);
    }
  }
};

console.log(getTotalCharacterNeedToBeProcessed(puzzleInput, 4));
console.log(getTotalCharacterNeedToBeProcessed(puzzleInput, 14));
