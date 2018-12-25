const generateBoard = function(length,filler = ' '){
    let array =[];
    for(let index = 0; index <length;index++){
      array[index] = new Array(length).fill(filler);
    }
    return array;
  }
  
  const createArray = function(size,filler=" "){
    return new Array(size).fill(filler);
  }
  
  const printBoard = function(array){
      let length = array.length;
    let dashline = createArray(length*4+1,"-").join("");
    console.log(dashline);
      for(let row =0;row < length;row++){
      let column = array[row].map(addSpaces).join("|");
          console.log("|"+column+"|");
          console.log(dashline);
      }
  }
  
  const addSpaces = function(text){
    return " "+text+" ";
  }
  
  const checkColumn = function(board,column,checker){
    let msg = board.every(function(element){
      return !(element[column] == checker);
    });
    return msg;
  }
  
  const checkRow = function(board,row,checker){
    return !board[row].includes(checker);
  }
  
  const checkFCross = function(board,row,column,checker){
    let msg = true;
    let rowToStart = 0;
    let columnToStart = 0;
    if(row > column ){
      rowToStart = row - column;
    }
    if(row < column){
      columnToStart = column - row;
    }
    while(rowToStart < board.length && columnToStart < board.length){
      if(board[rowToStart++][columnToStart++] == checker){
        msg = false;
      }
    }
    return msg;
  }
  
  const reverseBoard = function(board){
    for(let row = 0 ; row < board.length;row++){
      board[row] = board[row].reverse();
    }
  }
  
  const checkPlace = function(board,row,column,checker){
    let cRow = checkRow(board,row,checker);
    let cColumn = checkColumn(board,column,checker);
    let cFCross = checkFCross(board,row,column,checker);
    reverseBoard(board);
    let cBCross = checkFCross(board,row,(board.length - column -1),checker);
    reverseBoard(board);
    return cRow && cColumn && cFCross && cBCross;
  }
  
  const lastLength = function(queenPlaces){
    let temp = queenPlaces.length-1
    for(let row = queenPlaces.length-1 ; row > -1;row--){
      if(queenPlaces[row] != -1){
        temp = row;
        row = -1;
      }
    }
    return temp;
  }
  
  const copyBoard = function(source,destination){
    for(let row = 0;row < source.length; row++){
      for(let column = 0; column < source[row].length;column++){
        destination[row][column] = source[row][column];
      }
    }
  }
  
  const findQueenPlaces = function(board,checker){
    let result = board.map(function(element){
      return (element.includes(checker))?(-1):0;
    });
    return result;
  }
  
  const placeQueens = function(board,row,column,checker){
    let boardNumber = 0;
    let length = board.length;
    if(row && column){
      board[row-1][column-1] = checker;
    }
    let queenPlaces = findQueenPlaces(board,checker);
    let isQueenPlaced = true;
    let boardBackups = [];
    let finalBoards = [];
    let finalLength = lastLength(queenPlaces);
    for(let row = 0;row < length && row > -1;row++){
      if(queenPlaces[row] == -1){
      }else{
        boardBackups[row] = boardBackups[row] || generateBoard(length);
        let columnToStart = queenPlaces[row];
        if(!isQueenPlaced){
          copyBoard(boardBackups[row],board);
        }
        copyBoard(board,boardBackups[row]);
        isQueenPlaced = false;
        for(let column = columnToStart;column < length;column++){
          if(checkPlace(board,row,column,checker)){
            board[row][column] = checker;
            queenPlaces[row] = column+1;
            isQueenPlaced = true;
            column = board.length;
          }
        }
        if(row == finalLength && isQueenPlaced){
          finalBoards[boardNumber] = generateBoard(length);
          copyBoard(board,finalBoards[boardNumber]);
          isQueenPlaced = false;
          boardNumber++;
        };
        if(!isQueenPlaced){
          queenPlaces[row] = 0;
          if(queenPlaces[(row -1)] == -1){
            row --;
          }
          row -=2
        }
      }
    }
    return finalBoards;
  }
  
  const main = function(){
    let length = +process.argv[2];
    let row = +process.argv[3];
    let column = +process.argv[4];
    let checker = "Q"
    if((process.argv.length-3)%2){
      checker = process.argv[process.argv.length-1][0] || "Q";
    }
    let board = generateBoard(length);
    let finalBoards = placeQueens(board,row,column,checker);
    let i = 0;
    while(i < finalBoards.length){
      printBoard(finalBoards[i++]);
    }
    console.log(i);
  }
  main();