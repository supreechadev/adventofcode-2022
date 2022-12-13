const puzzleInput = require("./puzzle-input");

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

const getDirTree = (input) => {
  const commands = input.split("\n");
  const root = new Dir("root");
  let currentDir = root;

  for (const command of commands) {
    const [a, b, c] = command.split(" ");

    switch (true) {
      case a === "$" && b === "cd" && c !== ".." && c !== "/":
        const newDir = new Dir(c, currentDir);
        currentDir.addChild(newDir);
        currentDir = newDir;
        break;
      case a === "$" && b === "cd" && c === "..":
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

const getDirSizeList = (dir) => {
  let arr = [dir.getSize()];
  for (const child of dir.childs) {
    arr = [...arr, ...getDirSizeList(child)];
  }
  return arr;
};

const getTotalDirSizes = (input) => {
  const dirTree = getDirTree(input);
  const sizeList = getDirSizeList(dirTree);
  return sizeList.filter((e) => e <= 100000).reduce((sum, e) => sum + e);
};

const getDirToDelete = (input, needSpace) => {
  const totalSpace = 70000000;
  const dirTree = getDirTree(input);
  const totalUsed = dirTree.getSize();
  const freeSpace = totalSpace - totalUsed;
  needSpace = needSpace - freeSpace;

  if (needSpace < 0) {
    return "no need directory to delete";
  }

  const sizeList = getDirSizeList(dirTree)
    .filter((e) => e >= needSpace)
    .sort((a, b) => b - a);

  return sizeList.pop();
};

console.log(getTotalDirSizes(puzzleInput));
console.log(getDirToDelete(puzzleInput, 30000000));
