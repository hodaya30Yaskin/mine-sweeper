function createMat(size) {
  var mat = [];
  for (var i = 0; i < size; i++) {
    mat.push([]);
    for (var j = 0; j < size; j++) {
      mat[i][j] = EMPTY;
    }
  }
  return mat;
}

function setMinesNegsCount(board, cellI, cellJ) {
  var mineCount = 0;
  for (let i = cellI - 1; i <= cellI + 1; i++) {
    if (i < 0 || i >= board.length) continue;
    for (let j = cellJ - 1; j <= cellJ + 1; j++) {
      if (j < 0 || j >= board[0].length) continue;
      if (cellI === i && cellJ === j) continue;
      if (board[i][j].isMine) mineCount++;
    }
  }
  //   console.table(board);
  return mineCount;
}

function getRandomMinesPositions(board, minesCount) {
  var cellsBoard = [];

  for (let i = 0; i < minesCount; i++) {
    for (let j = 0; j < 2; j++) {
      var randomNum = getRandomInt(0, board.length);
      cellsBoard.push(randomNum);
    }
  }
  // console.log(cellsBoard);
  var currRandNums = [];
  var randCell = [];

  for (let i = 0; i <= cellsBoard.length / 2; i++) {
    randCell = cellsBoard.splice(0, 2);
    currRandNums.push(randCell);
  }
  for (let i = 0; i < currRandNums.length; i++) {
    var currNums = currRandNums[i];
    board[currNums[0]][currNums[1]].isMine = true;
  }
  console.log(currRandNums);
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
