var pause = false;

function turnInterval(){

    window.setInterval(function() {
        if (!pause){
            console.log(playerId);
            turn();
        }
    }, 500);

}

function  turn(){
    var route = host + "/turn/" + playerId;

    console.log(route);

        $.ajax({
            dataType: "json",
            type: 'get',
            url: route,
            success: function (data) {
                // data : objet JSON renvoyé par le serveur
                console.log(data);

                displayBoard(data.tableau);
                displayInterface(data);

                if (data.finPartie){
                    document.getElementById("gameOver").innerHTML = data.detailFinPartie;
                    document.getElementById("gameOver").style.display = "block";
                }
                

                if (data.status == 1){
                    pause = true;
                    toPlay(data.tableau, data.nbTenaillesJ1, data.nbTenaillesJ2);
                }

            },
            error: function() {
                console.log("Erreur");
            }
        });
}