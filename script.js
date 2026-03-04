const gridElement = document.getElementById("grid");
const scoreElement = document.getElementById("score");

let grid = [];
let score = 0;
const size = 4;


function init() {
  grid = Array(size).fill().map(() => Array(size).fill(0));
  score = 0;
  addRandomTile();
  addRandomTile();
  render();
}

function addRandomTile() {
  let empty = [];
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (grid[r][c] === 0) empty.push({ r, c });
    }
  }
  if (empty.length === 0) return;

  const { r, c } = empty[Math.floor(Math.random() * empty.length)];
  grid[r][c] = 2;
}

function render() {
  gridElement.innerHTML = "";
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const cell = document.createElement("div");
      const value = grid[r][c];
      cell.classList.add("cell");
      if (value !== 0) {
        cell.textContent = value;
        cell.classList.add(`tile-${value}`);
      }
      gridElement.appendChild(cell);
    }
  }
  scoreElement.textContent = score;
}

function slide(row) {
  let arr = row.filter(v => v !== 0);
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] === arr[i + 1]) {
      arr[i] *= 2;
      score += arr[i];
      arr[i + 1] = 0;
    }
  }
  arr = arr.filter(v => v !== 0);
  while (arr.length < size) arr.push(0);
  return arr;
}

function rotateGrid() {
  return grid[0].map((_, i) => grid.map(row => row[i]).reverse());
}

function moveLeft() {
  document.getElementById('direction').innerHTML = 'LEFT';
  changed = false
  for (let c = 0; c <size; c++) {
    for (let r = 0; r < size; r++) {
      let value = grid[r][c];
      if(value !== 0){
        finalColumnLeft = -1;
        for(let columnLeft = c-1;columnLeft >=0;columnLeft--){
            if(grid[r][columnLeft] !==0 && grid[r][columnLeft] === value){
                 finalColumnLeft = columnLeft
                 break;
            }
            else if(grid[r][columnLeft] === 0){
                finalColumnLeft = columnLeft
            }
        }
        if( finalColumnLeft !=-1){
            if(grid[r][finalColumnLeft] !== 0){
                value = value*2;
                score += value;
            }
            grid[r][finalColumnLeft] = value;
            grid[r][c] = 0;
            changed = true
        }
      }
    }
  }
  if(changed) {
    addRandomTile();
    render();
  }
}

function moveRight() {
  document.getElementById('direction').innerHTML = 'RIGHT';
  changed = false
  for (let c = size-2; c >=0; c--) {
    for (let r = 0; r < size; r++) {
      let value = grid[r][c];
      if(value !== 0){
        finalColumnRight = -1;
        for(let columnRight = c+1;columnRight < size;columnRight++){
            if(grid[r][columnRight] !==0 && grid[r][columnRight] === value){
                 finalColumnRight = columnRight
                 break;
            }
            else if(grid[r][columnRight] === 0){
                finalColumnRight = columnRight
            }
        }
        if( finalColumnRight !=-1){
            if(grid[r][finalColumnRight] !== 0){
                value = value*2;
                score += value;
            }
            grid[r][finalColumnRight] = value;
            grid[r][c] = 0;
            changed = true
        }
      }
    }
  }
  if(changed) {
    addRandomTile();
    render();
  }
}

function moveUp() {
  document.getElementById('direction').innerHTML = 'UP';
  changed = false
  for (let r = 1; r < size; r++) {
    for (let c = 0; c < size; c++) {
      let value = grid[r][c];
      if(value !== 0){
        finalRowTop = -1;
        for(let rowTop = r-1;rowTop >= 0 ;rowTop--){
            if(grid[rowTop][c] !==0 && grid[rowTop][c] === value){
                 finalRowTop = rowTop
                 break;
            }
            else if(grid[rowTop][c] !==0 && grid[rowTop][c] !== value){
                 break;
            }
            else if(grid[rowTop][c] === 0){
                finalRowTop = rowTop
            }
        }
        if( finalRowTop !=-1){
            if(grid[finalRowTop][c] !== 0){
                value = value*2;
                score += value
            }
            grid[finalRowTop][c] = value;
            grid[r][c] = 0;
            changed = true
        }
      }
    }
  }
  if(changed) {
    addRandomTile();
    render();
  }
}

function moveDown() {
  document.getElementById('direction').innerHTML = 'DOWN';
  changed = false
  for (let r = size-2; r >=0; r--) {
    for (let c = 0; c < size; c++) {
      let value = grid[r][c];
      if(value !== 0){
        finalRowBottom = -1;
        for(let rowBottom = r+1;rowBottom < size;rowBottom++){
            if(grid[rowBottom][c] !==0 && grid[rowBottom][c] === value){
                 finalRowBottom = rowBottom
                 break;
            }
            else if(grid[rowBottom][c] === 0){
                finalRowBottom = rowBottom
            }
        }
        if( finalRowBottom !=-1){
            if(grid[finalRowBottom][c] !== 0){
                value = value*2;
                score += value
            }
            grid[finalRowBottom][c] = value;
            grid[r][c] = 0;
            changed = true
        }
      }
    }
  }
  if(changed) {
    addRandomTile();
    render();
  }
}

document.addEventListener("keydown", e => {
  switch (e.key) {
    case "ArrowLeft": moveLeft(); break;
    case "ArrowRight": moveRight(); break;
    case "ArrowUp": moveUp(); break;
    case "ArrowDown": moveDown(); break;
  }
});

init();