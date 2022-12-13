const puzzleInput = require("./puzzle-input");

// Dir class
function Dir(name, parent) {
  this.name = name;
  this.childs = [];
  this.size = 0;
  this.parent = parent;
}

Dir.prototype.addChild = function (child) {
  this.childs.push(child);
};

Dir.prototype.addSize = function (value) {
  this.size += value;
};

Dir.prototype.getSize = function () {
  let totalChildSize = 0;
  for (let child of this.childs) {
    totalChildSize += child.getSize();
  }
  return totalChildSize + this.size;
};

Dir.prototype.getSizeList = function () {
  let arr = [this.getSize()];
  for (const child of this.childs) {
    arr = [...arr, ...child.getSizeList()];
  }
  return arr;
};
// Dir class

const getDirTree = (input) => {
  const commands = input.split("\n");
  const root = new Dir("root");
  let currentDir = root;
  for (const command of commands) {
    const [a, b, c] = command.split(" ");
    switch (true) {
      case b === "cd" && c !== ".." && c !== "/":
        const newDir = new Dir(c, currentDir);
        currentDir.addChild(newDir);
        currentDir = newDir;
        break;
      case c === "..":
        currentDir = currentDir.parent;
        break;
      case !isNaN(+a):
        currentDir.addSize(+a);
      default:
        break;
    }
  }
  return root;
};

const getTotalDirSizes = (input) => {
  const dir = getDirTree(input);
  return dir
    .getSizeList()
    .filter((e) => e <= 100000)
    .reduce((sum, e) => sum + e);
};

const getDirToDelete = (input) => {
  const dir = getDirTree(input);
  const needSpace = 30000000 - (70000000 - dir.getSize());

  return dir
    .getSizeList()
    .filter((e) => e >= needSpace)
    .sort((a, b) => b - a)
    .pop();
};

console.log(getTotalDirSizes(puzzleInput));
console.log(getDirToDelete(puzzleInput));
