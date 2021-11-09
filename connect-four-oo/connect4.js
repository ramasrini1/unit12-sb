/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

class Game{
  constructor(p1, p2, width = 7, height = 6){
    this.players = [p1, p2];
    this.height = height;
    this.width  = width;
    this.curPlayer = p1;
    this.makeBoard();
    this.makeHtmlBoard();
    this.gameOver = false;    
  }
   
  makeBoard() {
    this.board = [];
    for (let y = 0; y < this.height; y++) {
      this.board.push(Array.from({ length: this.width }));
    }
  }

  makeHtmlBoard() {
    const board = document.getElementById('board');
    board.innerHTML = '';
    
    // make column tops (clickable area for adding a piece to that column)
    const top = document.createElement('tr');
    top.setAttribute('id', 'column-top');
    // store a reference to the handleClick bound function 
    // so that we can remove the event listener correctly later
    this.handleGameClick = this.handleClick.bind(this);
    top.addEventListener('click', this.handleGameClick);
  
    for (let x = 0; x < this.width; x++) {
      const headCell = document.createElement('td');
      headCell.setAttribute('id', x);
      top.append(headCell);
    }
  
    board.append(top);
  
    // make main part of board
    for (let y = 0; y < this.height; y++) {
      const row = document.createElement('tr');
  
      for (let x = 0; x < this.width; x++) {
        const cell = document.createElement('td');
        cell.setAttribute('id', `${y}-${x}`);
        row.append(cell);
      }
      board.append(row);
    }
  }
  
  findSpotForCol(x) {
    for (let y = this.height - 1; y >= 0; y--) {
      if (!this.board[y][x]) {
        return y;
      }
    }
    return null;
  }

  placeInTable(y, x) {
    const piece = document.createElement('div');
    piece.classList.add('piece');
    piece.style.backgroundColor = this.curPlayer.color;
    //piece.style.top = -50 * (y + 2);
  
    const spot = document.getElementById(`${y}-${x}`);
    spot.append(piece);
  }
  
  endGame(msg) {
    alert(msg);
    const top = document.querySelector('#column-top');
    top.removeEventListener("click", this.handleGameClick);
    let btn = document.getElementById('startBtn');
    btn.setAttribute('status', "endGame");

  }

  handleClick(evt) {
    // get x from ID of clicked cell
    const x = +evt.target.id;
  
    // get next spot in column (if none, ignore click)
    //const y = this.findSpotForCol(x);
    const y = this.findSpotForCol(x);
    //console.log("x and y is " + x + " " + y);
    if (y === null) {
      return;
    }
  
    // place piece in board and add to HTML table
    this.board[y][x] = this.curPlayer;
    //console.log("pos val " + this.board[y][x]);
    this.placeInTable(y, x);

    // check for tie
    if (this.board.every(row => row.every(cell => cell))) {
      //this.gameOver = true;
      return this.endGame('Tie!');
    }
    
    // check for win
    if (this.checkForWin()) {
      //this.gameOver = true;
      return this.endGame(`Player ${this.curPlayer.color} won!`);
    }
      
    // switch players
    this.curPlayer = this.curPlayer === this.players[0] ? this.players[1] : this.players[0];
  }
 
  
  _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < this.height &&
        x >= 0 &&
        x < this.width &&
        this.board[y][x] === this.curPlayer
    );
  }
  
  
  /** checkForWin: check board cell-by-cell for "does a win start here?" */
  checkForWin() {
    
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        // get "check list" of 4 cells (starting here) for each of the different
        // ways to win
        const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
        const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
        const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
        const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
  
        // find winner (only checking each win-possibility as needed)
        if (this._win(horiz) || this._win(vert) || this._win(diagDR) || this._win(diagDL)) {
          return true;
        }
      }
    }
  }
}

class Player {
  constructor(color){
    this.color = color;
  }
}

document.getElementById('startBtn').addEventListener('click', () => {
  let p1Color = document.getElementById('p1-color').value;
  let p2Color = document.getElementById('p2-color').value;
  let btn = document.getElementById('startBtn');
  
  if( p1Color === p2Color){
    alert("Choose a different color");
  } else if (btn.getAttribute('status') === "progress"){
    alert("Game in Progress");
  } else {
    let p1 = new Player(p1Color);
    let p2 = new Player(p2Color);
    btn.setAttribute('status', "progress");
    let g = new Game(p1, p2, 6, 7);
  }
  
});

//-----------Commented Starter Code----------------------------------------------
//let currPlayer = 1; // active player: 1 or 2
//let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *   board = array of rows, each row is array of cells  (board[y][x])
 */
/** 
function makeBoard() {
  for (let y = 0; y < this.HEIGHT; y++) {
    board.push(Array.from({ length: this.WIDTH }));
  }
}
**/

/** makeHtmlBoard: make HTML table and row of column tops. */
/** 
function makeHtmlBoard() {
  const board = document.getElementById('board');

  // make column tops (clickable area for adding a piece to that column)
  const top = document.createElement('tr');
  top.setAttribute('id', 'column-top');
  top.addEventListener('click', handleClick);

  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement('td');
    headCell.setAttribute('id', x);
    top.append(headCell);
  }

  board.append(top);

  // make main part of board
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement('tr');

    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement('td');
      cell.setAttribute('id', `${y}-${x}`);
      row.append(cell);
    }
    board.append(row);
  }
}
**/

/** findSpotForCol: given column x, return top empty y (null if filled) */
/** 
function findSpotForCol(x) {
  for (let y = this.HEIGHT - 1; y >= 0; y--) {
    if (!this.board[y][x]) {
      return y;
    }
  }
  return null;
}
**/

/** placeInTable: update DOM to place piece into HTML table of board */
/** 
function placeInTable(y, x) {
  const piece = document.createElement('div');
  piece.classList.add('piece');
  piece.classList.add(`p${currPlayer}`);
  piece.style.top = -50 * (y + 2);

  const spot = document.getElementById(`${y}-${x}`);
  spot.append(piece);
}
**/

/** endGame: announce game end */
/** 
function endGame(msg) {
  alert(msg);
}
**/

/** handleClick: handle click of column top to play piece */
/** 
function handleClick(evt) {
  // get x from ID of clicked cell
  const x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  board[y][x] = currPlayer;
  placeInTable(y, x);
  
  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }
  
  // check for tie
  if (board.every(row => row.every(cell => cell))) {
    return endGame('Tie!');
  }
    
  // switch players
  currPlayer = currPlayer === 1 ? 2 : 1;
}
**/

/** checkForWin: check board cell-by-cell for "does a win start here?" */
/** 
function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      // get "check list" of 4 cells (starting here) for each of the different
      // ways to win
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      // find winner (only checking each win-possibility as needed)
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
**/