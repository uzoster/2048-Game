const gridContainer = document.getElementById('grid-container');
const scoreDisplay = document.getElementById('score');
let score = 0;
let grid = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0]
];


function startGame() {
  createGrid();
  generateRandomTile();
  generateRandomTile();
}


function createGrid() {
    gridContainer.innerHTML = '';
    grid.forEach(row => {
      row.forEach(cell => {
        const gridCell = document.createElement('div');
        gridCell.classList.add('grid-cell');
        if (cell !== 0) {
          gridCell.textContent = cell;
          gridCell.setAttribute('data-value', cell); // Raqamga mos rang beriladi
        } else {
          gridCell.textContent = '';
        }
        gridContainer.appendChild(gridCell);
      });
    });
    scoreDisplay.textContent = score;
  }
  


function generateRandomTile() {
  let emptyTiles = [];
  grid.forEach((row, rowIndex) => {
    row.forEach((cell, cellIndex) => {
      if (cell === 0) {
        emptyTiles.push({ row: rowIndex, col: cellIndex });
      }
    });
  });
  if (emptyTiles.length > 0) {
    const randomTile = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
    grid[randomTile.row][randomTile.col] = Math.random() > 0.1 ? 2 : 4;
    createGrid();
  }
}


function move(direction) {
  if (direction === 'left') moveLeft();
  if (direction === 'right') moveRight();
  if (direction === 'up') moveUp();
  if (direction === 'down') moveDown();
  generateRandomTile();
}


function moveLeft() {
  grid = grid.map(row => slide(row));
}


function moveRight() {
  grid = grid.map(row => slide(row.reverse()).reverse());
}


function moveUp() {
  grid = rotateGrid(grid);
  moveLeft();
  grid = rotateGrid(grid, true);
}


function moveDown() {
  grid = rotateGrid(grid);
  moveRight();
  grid = rotateGrid(grid, true);
}


function slide(row) {
  row = row.filter(val => val);
  for (let i = 0; i < row.length - 1; i++) {
    if (row[i] === row[i + 1]) {
      row[i] *= 2;
      score += row[i];
      row[i + 1] = 0;
    }
  }
  row = row.filter(val => val);
  while (row.length < 4) row.push(0);
  return row;
}


function rotateGrid(grid, reverse = false) {
  const newGrid = grid[0].map((_, i) => grid.map(row => row[i]));
  return reverse ? newGrid.map(row => row.reverse()) : newGrid;
}


window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') move('left');
  if (e.key === 'ArrowRight') move('right');
  if (e.key === 'ArrowUp') move('up');
  if (e.key === 'ArrowDown') move('down');
});


startGame();
