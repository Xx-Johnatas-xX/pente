var pause = false;

function turnInterval(){

    window.setInterval(function() {
        if (!pause){
            console.log(playerId);
            turn();
        }
    }, 2000);

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
                

                if (data.status == 1){
                    pause = true;
                    toPlay(data.tableau);
                }

            },
            error: function() {
                console.log("Erreur");
            }
        });
}