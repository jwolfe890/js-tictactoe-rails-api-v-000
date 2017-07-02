  var winCombinations = [
    [0,1,2], // Top row
    [3,4,5], // Middle row
    [6,7,8], // Bottom row
    [0,3,6], // Left Column
    [1,4,7], // Middle Column
    [2,5,8], // Right Column
    [0,4,8], // Diagnoal L to R
    [2,4,6]  // Diagnoal R to L
  ]

var turn = 0
// var board = {}

// var getBoard = () => {
//   var index = 0
//   document.querySelectorAll("[data-y='0']").forEach(function(row){
//      board[index] = row.innerHTML
//      index ++
//   })
//   document.querySelectorAll("[data-y='1']").forEach(function(row){
//      board[index] = row.innerHTML
//      index ++
//   })
//   document.querySelectorAll("[data-y='2']").forEach(function(row){
//      board[index] = row.innerHTML
//      index ++
//   })
// }

var board = []

var getBoard = function(){
     board = []
    document.querySelectorAll("[data-y]").forEach(function(cell){
     board.push(cell.innerHTML)
 })
}

function player() { 
  if (turn % 2 == 0) {
    return "X"
  } else {
    return "O"
  }
}

var message = string => {
  document.getElementById('message').innerHTML = `<p>${string}</p>`
}

var resetBoard = () => {
  turn = 0
  $("td").html('');
}

function checkWinner() {

  getBoard()
  for (var i = 0; i < winCombinations.length; i++) {
    var row = winCombinations[i];
    if (board[row[0]] == board[row[1]] && board[row[2]] == board[row[1]] && board[row[0]] != ""){
      message(`Player ${board[row[0]]} Won!`)
      return true;
    }
  }
    return false
}

var updateState = function(target) {
  $(target).html(player())
}

function doTurn(e) {
    updateState(e.target)
    if (checkWinner()) {
      resetBoard();
    }

    if (turn == 9){
      message('Tie game.')
      resetBoard();
    }
    
    turn ++
}

function getPrevious(data) { 
  var gamesDiv = '' 
  $.get("/games", function(data) { 
    data.data.forEach(function(game) { 
      gamesDiv += `<li class="game" data-id="${game.id}" > ${game.id} ${game.attributes.state} \n </li>`
    }); 
    $("#games").html(gamesDiv) 
  }); 
}

function attachListeners() {
  $(document).ready(function() {
    $('tbody').on("click", function (e) {
      if (e.target.dataset && e.target.innerHTML == "") {
        doTurn(e)
      }
    }); 
    $('#previous').on("click", function () {
      getPrevious()
    })
  })
}

attachListeners()


