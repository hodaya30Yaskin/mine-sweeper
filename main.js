"use strict";

const MINES_IMG = '<img src="img/minesImg.png"/>';
const MINES = 'mines'
var gBoard = {
  minesAroundCount: 4,
  isShown: true,
  isMine: false,
  isMarked: true,
};

var gLevel = {
  SIZE: 4,
  MINES: 2,
};

var gGame = {
  isOn: false,
  shownCount: 0,
  markedCount: 0,
  secsPassed: 0,
};

function initGame() {
  console.log("hi");
  var gBoard = buildBoard();
  renderBoard(gBoard);
//   setMinesNegsCount(gBoard);
}

function buildBoard() {
  // var board = createMat(gLevel.SIZE, gLevel.SIZE)

  var boardBuild = [];
  for (let i = 0; i < gLevel.SIZE; i++) {
      var row = []
      for (let j = 0; j < gLevel.SIZE; j++) {
          // var currPos = { i , j }

          row.push('');
          
          // boardBuild.push(currPos)
        }
        boardBuild.push(row);
  }
//    boardBuild[2][2].isShown.innerHTML = MINES
//   boardBuild[0][1].isShown = MINES
boardBuild[0][1] = MINES
boardBuild[2][2] = MINES
  console.table(boardBuild);
  return boardBuild;
}

// function setMinesNegsCount(board) {
//   // for (let i = 0; i < gLevel.MINES; i++) {
  
//   // }
//   console.log(board);
//   console.log("hi");
// }

function renderBoard(board) {
    var strHTML = "";
    for (var i = 0; i < board.length; i++) {
        strHTML += "<tr>\n";
        for (var j = 0; j < board[0].length; j++) {
            // console.log(i,j)
            var currCell = board[i][j]
            strHTML +=
            `\t<td class="cell ${i}"-" ${j} " onclick="cellClicked(${elBoard} ${i}, ${j})">\n`;
            // mines
            if(currCell=== MINES) strHTML += MINES_IMG;
            
            strHTML += "\t</td> \n";
        }
        strHTML += "</tr>\n";
    }
    var elBoard = document.querySelector(".board");
  elBoard.innerHTML = strHTML;
}

// function cellClicked(elCell, i, j) {
// // var strHTML=""
//     var currCell = gBoard[i][j]
//     if(currCell=== MINES) var strHTML = MINES_IMG;
//     elCell.innerHTML = strHTML;
// }
// function checkGameOver() {}
