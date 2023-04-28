var mines_count = 10
var r = 8
var c = 8

window.onload = function() {
    startGame();
}

const game = document.getElementById("minesweeper")
var table = document.createElement("table")

function startGame() {
    document.getElementById("mines-count").innerHTML = mines_count
    for(var i = 0; i < c; i++) {
        var row = document.createElement("tr")
        for(var j = 0; j < r; j++) {
            var tile = document.createElement("td")
            row.appendChild(tile)
        }
        table.appendChild(row)
        console.log(row)
    }
    game.appendChild(table)
}
