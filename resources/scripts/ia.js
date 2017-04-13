function premierTourIA() {
    play(9,9);
}

function deuxiemeTourIA() {
    
}

function premierTourAdversaire() {
    var tabfirst = ["8.9", "10.9", "9.8", "9.10", "8.8", "8.10", "10.8", "10.10", "7.9", "11.9", "9.7", "9.11"];
    var randomfirst = tabfirst[Math.floor(Math.random() * tabfirst.length)];
    var x = randomfirst.substr(0, 1);
    var y = randomfirst.substr(2, 1);

    play(x, y);
}

function deuxiemeTourAdversaire() {

}

function autresTours() {
    
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