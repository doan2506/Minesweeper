var mines_count = 10
var r = 8
var c = 8

window.onload = function() {
    startGame();
}

const game = document.getElementById("minesweeper")
var board = document.createElement("board")

function startGame() {
    document.getElementById("mines-count").innerHTML = mines_count
    for(var i = 0; i < c; i++) {
        var row = document.createElement("br")
        for(var j = 0; j < r; j++) {
            var tile = document.createElement("bp")
            row.append(tile)
        }
        board.append(row)
    }
    game.append(board)
}
