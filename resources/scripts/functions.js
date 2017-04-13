// Variable globale du plateau de jeu.
var board = new Array(19);
var numTurn = 0;
var numPlayer = 0;
// Initialisation du plateau vide.
function emptyBoard(){
    for (i=0; i<19; i++){
        line = new Array(19);
        for (j=0; j<19; j++){
            line[j] = 0;
        }
        board[i] = line;
    }
}

// Affichage du plateau de jeu à partir d'un array.
function displayBoard(board) {

    var mytable = "<table cellspacing='0' class='board'><tbody><tr class='line'>";

    for (i=0; i<19; i++){
        for (j=0; j<19; j++){

            if (j == 0 && i != 0){
                mytable += "</tr><tr class='line'>";
            }

            if (i == 0 || j == 0 ){
                mytable += "<td class='cell border-cell piece"+board[i][j]+"'><div class='pion"+ board[i][j] +"'></div></td>";
            }
            else if (i == 8 && j == 8) {
                mytable += "<td class='cell corner-cell-tl piece"+board[i][j]+"'><div class='pion"+ board[i][j] +"'></div></td>";
            }
            else if (i == 8 && j == 11) {
                mytable += "<td class='cell corner-cell-tr piece"+board[i][j]+"'><div class='pion"+ board[i][j] +"'></div></td>";
            }
            else if (i == 11 && j == 8) {
                mytable += "<td class='cell corner-cell-bl piece"+board[i][j]+"'><div class='pion"+ board[i][j] +"'></div></td>";
            }
            else if (i == 11 && j == 11) {
                mytable += "<td class='cell corner-cell-br piece"+board[i][j]+"'><div class='pion"+ board[i][j] +"'></div></td>";
            }
            else if (i == 9 && j == 9) {
                mytable += "<td class='cell center-cell-tl piece"+board[i][j]+"'><div class='pion"+ board[i][j] +"'></div></td>";
            }
            else if (i == 9 && j == 10) {
                mytable += "<td class='cell center-cell-tr piece"+board[i][j]+"'><div class='pion"+ board[i][j] +"'></div></td>";
            }
            else if (i == 10 && j == 9) {
                mytable += "<td class='cell center-cell-bl piece"+board[i][j]+"'><div class='pion"+ board[i][j] +"'></div></td>";
            }
            else if (i == 10 && j == 10) {
                mytable += "<td class='cell center-cell-br piece"+board[i][j]+"'><div class='pion"+ board[i][j] +"'></div></td>";
            }

            else {
                mytable += "<td class='cell normal-cell piece"+board[i][j]+"'><div class='pion"+ board[i][j] +"'></div></td>";
            }

        }
    }

    mytable += "</tr></tbody></table>";

    document.getElementById("boardBackground").innerHTML = mytable;
}


function displayInterface(){

}