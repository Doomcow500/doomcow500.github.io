
// 2 Players information
var player1 = "Blue";
var player2 = "Red";
var player1Color = 'rgb(45, 146, 247)'; // blue color for player1
var player2Color = 'rgb(237, 45, 73)';  // red color for player2
var boardColor = 'rgb(189, 189, 189)';  // game board color
var winColor = 'rgb(65, 186, 69)';      // color for winner
var game_on;

// Click event to start game
$('#btnStart').click(function(){

  for (var c = 0; c < 6; c++){
    for(var r = 0; r < 7; r++){
      changeChipColor(r, c, boardColor)
      }
    }

  game_on = true;
});

// change 1 chip color
function changeChipColor(row, col, color){
  var chip = $('.board tr').eq(row).find('td').eq(col).find('button');
  return chip.css('background-color', color);
};

// change 1 chip color
function fadeChipColor(row, col, color){
  var chip = $('.board tr').eq(row).find('td').eq(col).find('button');
  // return chip.fadeOut('fast');
  chip.hide(1000);
  chip.show(1000);
};

// get the current chip's color by column and  row
function returnColor(row, col){

  return $('.board tr').eq(row).find('td').eq(col).find('button').css('background-color');

};

// return the available row position by a column index
function checkPosition(col){

  var colorReport = returnColor(5, col);

  for (var r = 5; r > -1; r--){
    colorReport = returnColor(r,col);
    if(colorReport === boardColor){
      return r;
    }
  }

};

// check 4 connect chips as a same color
function colorCheckFour(one, two, three, four){
  return (one !== boardColor && one !== undefined && one === two && one === three && one === four)
}

// check chips as Columns
function colorCheckCols(){
  for(var r = 0; r < 6; r++){
    for (var c = 0; c < 4; c++){
      if(colorCheckFour(returnColor(r,c), returnColor(r,c+1), returnColor(r,c+2), returnColor(r,c+3))){
        //alert("You won as rows!");
        // blink 4 chips
        fadeChipColor(r,c, winColor);
        fadeChipColor(r,c+1, winColor);
        fadeChipColor(r,c+2, winColor);
        fadeChipColor(r,c+3, winColor);
        return true;
      }
    }
  }
}

// check chips as Rows
function colorCheckRows(){
  for (var c = 0; c < 7; c++){
    for(var r = 0; r < 3; r++){
      if(colorCheckFour(returnColor(r,c), returnColor(r+1,c), returnColor(r+2,c), returnColor(r+3,c))){
        fadeChipColor(r,c, winColor);
        fadeChipColor(r+1,c, winColor);
        fadeChipColor(r+2,c, winColor);
        fadeChipColor(r+3,c, winColor);
        return true;
      }
    }
  }
}

// check chips as Diagonal
function colorCheckDiagonal(){
  for (var c = 0; c < 4; c++){
    for(var r = 0; r < 3; r++){
      if(colorCheckFour(returnColor(r,c), returnColor(r+1,c+1), returnColor(r+2,c+2), returnColor(r+3,c+3))){
        fadeChipColor(r,c, winColor);
        fadeChipColor(r+1,c+1, winColor);
        fadeChipColor(r+2,c+2, winColor);
        fadeChipColor(r+3,c+3, winColor);
        return true;
      }
    }
  }
  for (var c = 3; c < 7; c++){
    for(var r = 0; r < 3; r++){
      if(colorCheckFour(returnColor(r,c), returnColor(r+1,c-1), returnColor(r+2,c-2), returnColor(r+3,c-3))){
        fadeChipColor(r,c, winColor);
        fadeChipColor(r+1,c-1, winColor);
        fadeChipColor(r+2,c-2, winColor);
        fadeChipColor(r+3,c-3, winColor);
        return true;
      }
    }
  }

}

// =======================
//    start new game
// =======================
var gamePlayer = 1;
var gameName = player1;
var gameColor = player1Color;

// show players's color on the top
$('.players button').eq(0).css('background-color',gameColor);
$('.players button').eq(1).css('background-color',boardColor);

// Click chip //
$('.board button').on('click', function(){

  if (gamePlayer > 2) return;     // check for the completed game

  var col = $(this).closest('td').index();

  var rowAvail = checkPosition(col);

  // change color
  changeChipColor(rowAvail, col, gameColor);

  // check 4 chips in a row
  if( colorCheckRows() || colorCheckCols() || colorCheckDiagonal() ){
    $('h1').text( gameName + " Wins!");
    $('h1').css('color', gameColor);
    $('h3').text('Press button to start new game');

    gamePlayer = 3; // set to end the game

  }else{

      // switch players
      if(gamePlayer == 1){

        gamePlayer = 2;
        gameName = player2;
        gameColor = player2Color;
        $('.players button').eq(1).css('background-color',gameColor);
        $('.players button').eq(0).css('background-color',boardColor);

      }
      else{
        gamePlayer = 1;
        gameName = player1;
        gameColor = player1Color;
        $('.players button').eq(0).css('background-color',gameColor);
        $('.players button').eq(1).css('background-color',boardColor);

      }
  }
});
