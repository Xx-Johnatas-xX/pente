var numTurn = 0;
var weStart = false;
function toPlay(tableau, nbTenaillesJ1, nbTenaillesJ2){
    console.log(numTurn);
    if (numTurn == 0){
        console.log(tableau[9][9]);
        if (tableau[9][9] == 0){
            weStart = true;
            premierTourIA();
            numTurn++;
        }
        else {
            premierTourAdversaire();
            numTurn++;
        }
    }
    else if(numTurn == 1){
        console.log(weStart);
        if (weStart){
            deuxiemeTourIA(tableau);
            numTurn++;
        }
        else{
            deuxiemeTourAdversaire(tableau);
            numTurn++;
        }
    }
    else{
        autresTours(tableau, playerNumber, nbTenaillesJ1, nbTenaillesJ2);
        numTurn++;
    }
}

function premierTourIA() {
    play(9,9);
}

function deuxiemeTourIA(tableau) {
    var tabdeuxia = tableau;
    var tabpion = [[5, 5], [5, 9], [5, 13], [9, 5], [9, 13], [13, 5], [13, 9], [13, 13]];
    var x = 0;
    var y = 0;

    for (var i =0; i<19; i++) {
        for (var j = 0; j < 19; j++) {
            if (tabdeuxia[i][j] == 0 && tabdeuxia[i][j] != playerNumber && (i != 9 && j != 9)) {
                var test = false;
                while (test == false) {
                    var randomindex = Math.floor(Math.random() * 8);
                    var randomx = tabpion[randomindex][0];
                    var randomy = tabpion[randomindex][1];
                    if ((randomx == 5 && randomy == 5) || (randomx == 13 && randomy == 13)) {
                        if (i == j) {
                            test = false;
                        }
                        else {
                            test = true;
                            x = randomx;
                            y = randomy;
                        }
                    }
                    else if ((randomx == 5 && randomy == 9) || (randomx == 13 && randomy == 9)) {
                        if (j == 9) {
                            test = false;
                        }
                        else {
                            test = true;
                            x = randomx;
                            y = randomy;
                        }
                    }
                    else if ((randomx == 9 && randomy == 5) || (randomx == 9 && randomy == 13)) {
                        if (i == 9) {
                            test = false;
                        }
                        else {
                            test = true;
                            x = randomx;
                            y = randomy;
                        }
                    }
                    else {
                        if (Math.abs(i-9) == Math.abs(j-9)) {
                            test = false;
                        }
                        else {
                            test = true;
                            x = randomx;
                            y = randomy;
                        }
                    }
                }
            }
        }
    }
    play(x,y);
}

function premierTourAdversaire() {
    var tabfirst = [[9, 8], [9, 10], [8, 9], [10, 9], [8, 8], [10, 8], [8, 10], [10, 10], [9, 7], [9, 11], [7, 9], [11, 9]];
    var randomfirst = Math.floor(Math.random() * 12);
    var x = tabfirst[randomfirst][0];
    var y = tabfirst[randomfirst][1];

    play(x, y);
}

function deuxiemeTourAdversaire(tableau) {
    var x = 0;
    var y = 0;

    var tabsecond = tableau;
    for (var i =0; i<19; i++){
        for (var j =0; j<19; j++){
            if (tabsecond[i][j] == 1 && (i != 9 && j != 9)){
                if (i == 9) {
                    if (j > 9){
                        for (var z =10; z<j; z++){
                            if (tabsecond[i][j] == 2) {
                                x = i+1;
                                y = z;
                            }
                        }
                        if (x == 0) {
                            x = 9;
                            y = 10;
                        }
                    }
                    else {
                        for (var zz =8; zz>j; zz--){
                            if (tabsecond[i][j] == 2) {
                                x = i-1;
                                y = z;
                            }
                        }
                        if (x == 0) {
                            x = 9;
                            y = 8;
                        }
                    }
                }
                else if (j == 9) {
                    if (i > 9){
                        for (var zzz =10; zzz<i; zzz++){
                            if (tabsecond[i][j] == 2) {
                                x = i;
                                y = z+1;
                            }
                        }
                        if (x == 0) {
                            x = 10;
                            y = 9;
                        }
                    }
                    else {
                        for (var zzzz =8; zzzz>i; zzzz--){
                            if (tabsecond[i][j] == 2) {
                                x = i;
                                y = z-1;
                            }
                        }
                        if (x == 0) {
                            x = 8;
                            y = 9;
                        }
                    }
                }
                else {
                    if (diagalign(i,j)) {
                        if (i < 9) {
                            x = i+1;
                        }
                        else {
                            x = i-1;
                        }
                        if (j < 9) {
                            y = j+1;
                        }
                        else {
                            y = j-1;
                        }
                    }
                    else {
                        for (var za =7; za<12; i++) {
                            for (var zb = 7; zb < 12; j++) {
                                if (tabsecond[i][j] == 2) {
                                    var x1 = 9;
                                    var y1 = 9;
                                    do {
                                        var possibilites = [[(i+1), (j+1)], [(i+1), j], [(i+1), (j-1)], [i, (j+1)], [i, (j-1)], [(i-1), (j+1)], [(i-1), j], [(i-1), (j-1)]];
                                        var randomsecond = Math.floor(Math.random() * 8);
                                        x1 = possibilites[randomsecond][0];
                                        y1 = possibilites[randomsecond][1];
                                    } while (x1 == 9 && y1 == 9);
                                    x = x1;
                                    y = y1;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    play(x,y);
}

function autresTours(tableau, numJoueur, nbTenaillesJ1, nbTenaillesJ2) {
    var solutions = solveProblem(tableau, numJoueur, nbTenaillesJ1, nbTenaillesJ2);
    var x = 0;
    var y = 0;
    var poids = 0;

    for (var i =0; i<solutions.length;i++){
        if (poids == 0 || poids < solutions[i][2]){
            poids = solutions[i][2];
            x = solutions[i][0];
            y = solutions[i][1];
        }
    }
    if (x == null || y == null) {
        randomsecurity(tableau);
    }
    else {
        play(x,y);
    }
}

function play(x, y) {
    var route = host + "/play/" + x + "/" + y + "/" + playerId;
    console.log(route);
    $.ajax({
        dataType: "json",
        type: 'get',
        url: route,
        success: function (data) {
            // data : objet JSON renvoyé par le serveur
            pause = false;
            console.log(data);
        },
        error: function() {
            console.log("Erreur");
            var x = Math.floor(Math.random() * 19);
            var y = Math.floor(Math.random() * 19);
            play(x,y);
        }
    });
}

function diagalign(i, j) {
    if (i == j) {
        return true;
    }
    else if (Math.abs(i-9) == Math.abs(j-9)) {
        return true;
    }
    else {
        return false;
    }
}

function randomsecurity(tableau) {
    var cbontupeurandom = false;
    while (cbontupeurandom == false) {
        var x = Math.floor(Math.random() * 19);
        var y = Math.floor(Math.random() * 19);
        if (tableau[x][y] == 0) {
            cbontupeurandom = true;
        }
    }
    play(x, y);
}