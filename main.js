"use strict";

const MINE = "💣";
const EMPTY = '';
const FLAG = "🏴";
const LIVES = '❤️'
var gBoard = [];

var gLevel = {
  SIZE: 4,
  MINES: 2,
};

var gGame = {
  isOn: false,
  showCount: 0,
  markedCount: 0,
  secsPassed: 0,
  startTime: 0,
  interval: false,
  livesCount:3
};

function initGame() {
    
  clearInterval(gGame.interval);
  gGame.interval = 0;
  gGame.startTime = new Date();
 
  renderTime();
  gBoard = createMat(gLevel.SIZE);
  buildBoard(gBoard)
  //   gBoard = buildBoard();

  renderBoard(gBoard);
  setMinesNegsCount(gBoard);
}

function buildBoard(gBoard) {
  for (let i = 0; i < gBoard.length; i++) {
    for (let j = 0; j < gBoard[0].length; j++) {
      gBoard[i][j] = {
        minesAroundCount: 0,
        isShown: false,
        isMine: false,
        isMarked: false,
      };
    }
  }
  getRandomMinesPositions(gBoard, gLevel.MINES);
  console.table(gBoard);
  return gBoard;
}

function renderBoard(board) {
  var strHTML = "";
  for (var i = 0; i < board.length; i++) {
    strHTML += "<tr>\n";
    for (var j = 0; j < board[i].length; j++) {
        // console.log( board[i][j])
      board[i][j].minesAroundCount = setMinesNegsCount(board, i, j);
      if (board[i][j].isShown) {
        var cell = MINE;
      } else cell = EMPTY;
      var classNameCell = `cell cell-i${i} cell-j${j}`;
      strHTML += `\t<td class="${classNameCell}" onclick="cellClicked(this,${i},${j})"
      oncontextmenu="cellMarked(this, event)">${cell}</td>\n`;
    }
    strHTML += "</tr>\n";
  }
  
  var elBoard = document.querySelector(".board");
  elBoard.innerHTML = strHTML;
  //   console.table(board)
}

function firstClicked(elCell) {
  gGame.isOn = true;
  gGame.startTime = new Date();
  gGame.interval = setInterval(renderTime, 1000);

  buildBoard(gBoard);
  renderBoard(gBoard);
}

function cellClicked(elCell, i, j) {
  //   console.log(elCell, i, j);
  var cell = gBoard[i][j];
  // if(elCell===MINES_IMG)
  if (!gGame.interval) firstClicked(elCell);
  if (!gGame.isOn) return;
  if (cell.isMarked) return;

  cell.isShown = true;
  cell.isMarked = true;

  if (cell.isMine) {
    // gGame.livesCount.splice(0,1);
    renderLives()
    // var elLives = document.querySelector('.lives')
    // elLives.splice(0,1)
    // elLives.splice(0,1)
    console.log(gGame.livesCount);

    if (!gGame.livesCount) {
      cell.isOn = false;
      clearInterval(gGame.interval);
    }
    checkGameOver();
  } else {
    gGame.showCount++;
  }
  if (cell.minesAroundCount === 0) {
    // showNumbersAround(gBoard,elCell.i,elCell.j)
    renderBoard(gBoard);
  }
  checkGameOver();
  renderBoard(gBoard);
}

// function showNumbersAround(board, cellI, cellJ) {
  // board[cellI][cellJ].isChecked = true
  // for (let i = cellI-1; i <= cellI+1; i++) {
  //     if(i<0|| i >= board.length) continue
  //     for (let j = cellJ-1; i <= cellJ+1; j++) {
  //     }
  // }
// }

function cellMarked(elCell) {
  if (!gGame.isOn) return;

  var cellMark = gBoard[elCell.cell.i][elCell.cell.j];
  if (cellMark.isMarked && !cellMark.isMarked) return;
  if (cell.isMine) cell.isMarked ? gGame.markedCount++ : gGame.markedCount--;
}
function checkGameOver() {
  if (gGame.markedCount === gLevel.MINES) {
    var noneMinse = gLevel.SIZE * gLevel.SIZE - gLevel.MINES;
    if (gGame.showCount === noneMinse) {
      gGame.isOn = false;
      clearInterval(gGame.interval);
      // cheing the smiley
    }
  }
}

function renderTime(){
var now = new Date()
var second = Math.floor((now - gGame.startTime)/1000)
if(second<100) second = '0' +second

var elTime = document.querySelector('.timer')
elTime.innerText = second
}

function renderLives(){
    gGame.livesCount--
    var elLives = document.querySelector('.lives')
elLives.innerHTML = gGame.livesCount *LIVES

}
