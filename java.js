var r = 8;
var c = 12;
var mines_location = [];
var tile_clicked = [];
var tile_count = 0;
var mines_left = 10;
var mines = 10;
var state = false;

window.onload = function() {
    startGame();
}

const reset = document.getElementById("header");
reset.addEventListener("click", startGame)
var mines_count = document.getElementById("mines-count");

function startGame() {
    state = false;
    mines_location = [];
    tile_clicked = [];
    tile_count = 0;
    mines = 10;
    document.getElementById("text").innerHTML = "";
    mines_count = 10;
    const game = document.getElementById("minesweeper");
    game.innerHTML = "";
    var table = document.createElement("table");
    document.getElementById("mines-count").innerHTML = mines_count;
    set_mines();
    for(var i = 0; i < r; i++) {
        var row = document.createElement("tr");
        for(var j = 0; j < c; j++) {
            var tile = document.createElement("td");
            tile.id = i.toString() + "-" + j.toString();
            addTileListener(tile, i, j);
            row.appendChild(tile);
        }
        table.appendChild(row);
    }
    game.appendChild(table);
}

function set_mines() {
    let mines_left = mines_count;
    while(mines_left > 0) {
        var r = Math.floor(Math.random() * 8);
        var c = Math.floor(Math.random() * 8);
        var id = r.toString() + "-" + c.toString();
        if(!mines_location.includes(id)) {
            mines_location.push(id);
            mines_left--;
        }
    }
}

function addTileListener(tile, row, col){
    tile.addEventListener("contextmenu", (e) => {e.preventDefault()});
	tile.addEventListener('mousedown', function(event) {
        if(event.which == 1) {
            tile_click(tile, row, col);
        } else if(event.which == 3) {
            set_flag(tile);
        }
    });
}

function set_flag(tile) {
    if(tile.textContent == "🚩") {
        tile.textContent = "";
        document.getElementById("mines-count").innerHTML = ++mines_count;
    } else if(tile.textContent == "") {
        tile.textContent = "🚩";
        document.getElementById("mines-count").innerHTML = --mines_count;
    }
}

function tile_click(tile, row, col) {
    if(state == true) return;
    if(mines_location.includes(tile.id)) {
        reveal_mines();
        document.getElementById("text").innerHTML = "Game Over!";
        state = true;
    } else {
        check_mines(row, col);
    }
}

function reveal_mines() {
    for(var i = 0; i < r; i++) {
        for(var j = 0; j < c; j++) {
            var id = i.toString() + "-" + j.toString();
            if(mines_location.includes(id)) {
                document.getElementById(id).style.backgroundColor = "red";
                document.getElementById(id).textContent = "💣"
            }
        }
    }
}

function check_mines(row, col) {
    if(state == true) return;
    var id = row.toString() + "-" + col.toString();
    if(row < 0 || row >= r || col < 0 || col >= c) return;
    if(tile_clicked.includes(id)) return;
    tile_clicked.push(id);
    tile_count++;
    var mines_around = 0;
    mines_around += check_tile(row - 1, col - 1);
    mines_around += check_tile(row - 1, col);
    mines_around += check_tile(row + 1, col - 1);
    mines_around += check_tile(row + 1, col);
    mines_around += check_tile(row + 1, col + 1);
    mines_around += check_tile(row, col + 1);
    mines_around += check_tile(row - 1, col + 1);
    mines_around += check_tile(row, col - 1);
    if(mines_around > 0) {
        document.getElementById(id).textContent = mines_around;
    } else {
        check_mines(row - 1, col);
        check_mines(row + 1, col);
        check_mines(row, col + 1);
        check_mines(row, col - 1);
        check_mines(row - 1, col - 1);
        check_mines(row + 1, col - 1);
        check_mines(row + 1, col + 1);
        check_mines(row - 1, col + 1);
    }
    document.getElementById(id).style.backgroundColor = "darkgray";
    console.log(tile_count, r * c - mines_count)
    if(tile_count == (r * c - mines)) {
        console.log("sus")
        document.getElementById("text").innerHTML = "You Win!";
        state = true;
    }
}

function check_tile(row, col) {
    var id = row.toString() + "-" + col.toString();
    if(row < 0 || row >= r || col < 0 || col >= c) return 0;
    if(mines_location.includes(id)) {
        return 1;
    } else {
        return 0;
    }
}
