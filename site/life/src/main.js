function getGrid() {
  return document.getElementById("grid");
}

// remember zero-indexing (September = 8)
let birth = new Date(2000, 8, 12);
let today = new Date(Date.now());
const weekInMS = 1000 * 3600 * 24 * 7;
let weeksLived = Math.floor((today - birth) / weekInMS);

function appendCell(grid) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  grid.appendChild(cell);
}

function highlightCells(grid) {
  console.log(grid.children);
}

for (let i = 0; i < 52 * 80; i++) appendCell(getGrid());

console.log(birth);
console.log(today);
console.log(weeksLived);
console.log();

highlightCells(getGrid());
