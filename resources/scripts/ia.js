var IAClient = require('./public/IAClient');

function premierTourIA() {
    play(9,9);
}

function deuxiemeTourIA() {
    var tabdeuxia = tableau;
    var tabpion = ["6.6", "6.9", "6.12", "9.6", "9.12", "12.6", "12.9", "12.12"];
    var x = '';
    var y = '';

    for (var i =0; i<19; i++) {
        for (var j = 0; j < 19; j++) {
            if (tabdeuxia[i][j] == 1 && (i != 9 && j != 9)) {
                var test = false;
                while (test == false) {
                    var randomcoor = '';
                    var randomx = '';
                    var randomy = '';
                    if ((randomx == 6 && randomy == 6) || (randomx == 12 && randomy == 12)) {
                        if (i == j) {
                            test = false;
                        }
                        else {
                            test = true;
                            x = randomx;
                            y = randomy;
                        }
                    }
                    else if ((randomx == 6 && randomy == 9) || (randomx == 12 && randomy == 9)) {
                        if (j == 9) {
                            test = false;
                        }
                        else {
                            test = true;
                            x = randomx;
                            y = randomy;
                        }
                    }
                    else if ((randomx == 9 && randomy == 6) || (randomx == 9 && randomy == 12)) {
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
}

function premierTourAdversaire() {
    var tabfirst = ["8.9", "10.9", "9.8", "9.10", "8.8", "8.10", "10.8", "10.10", "7.9", "11.9", "9.7", "9.11"];
    var randomfirst = tabfirst[Math.floor(Math.random() * tabfirst.length)];
    var y = randomfirst.substr(0, 1);
    var x = randomfirst.substr(2, 1);

    play(x, y);
}

function deuxiemeTourAdversaire() {
    var x = null;
    var y = null;

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
                        if (x == null) {
                            x = 9;
                            y = 10;
                        }
                    }
                    else {
                        for (var z =8; z>j; z--){
                            if (tabsecond[i][j] == 2) {
                                x = i-1;
                                y = z;
                            }
                        }
                        if (x == null) {
                            x = 9;
                            y = 8;
                        }
                    }
                }
                else if (j == 9) {
                    if (i > 9){
                        for (var z =10; z<i; z++){
                            if (tabsecond[i][j] == 2) {
                                x = i;
                                y = z+1;
                            }
                        }
                        if (x == null) {
                            x = 10;
                            y = 9;
                        }
                    }
                    else {
                        for (var z =8; z>i; z--){
                            if (tabsecond[i][j] == 2) {
                                x = i;
                                y = z-1;
                            }
                        }
                        if (x == null) {
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
                                    while (x1 == 9 && y1 == 9){
                                        var possibilites = ["\"" + (i+1) + "." + (j+1) + "\"", "\"" + (i+1) + "." + (j) + "\"", "\"" + (i+1) + "." + (j-1) + "\"", "\"" + (i) + "." + (j+1) + "\"", "\"" + (i) + "." + (j-1) + "\"", "\"" + (i-1) + "." + (j+1) + "\"", "\"" + (i-1) + "." + (j) + "\"", "\"" + (i-1) + "." + (j-1) + "\""];
                                        var randomsecond = tabsecond[Math.floor(Math.random() * tabsecond.length)];
                                        x1 = randomsecond.substr(0, 1);
                                        y1 = randomsecond.substr(2, 1);
                                    }
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

function autresTours() {
    var solutions = IAClient.solveProblem(tab, numJoueur, nbTenaillesJ1, nbTenaillesJ2);
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
    play(x,y);
}

function play(x, y) {
    var route = host + "/play/" + x + "/" + y + "/" + playerId;

    $.ajax({
        dataType: "json",
        type: 'get',
        url: route,
        success: function (data) {
            // data : objet JSON renvoyé par le serveur
            console.log(data);
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