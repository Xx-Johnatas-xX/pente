function turnInterval(){

    window.setInterval(function() {
        console.log(playerId);
        turn();
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

                document.getElementById("scorePlayer1").innerHTML = data.nbTenaillesJ1

            },
            error: function() {
                console.log("Erreur");
            }
        });
}