$(document).ready(function () {


var characters = {
    obi: {
        name: "Obi Wan Kenobi",
        imageURL: "assets/images/ObiWanKenobi.jpeg",
    },
    luke: {
        name: "Luke Skywalker",
        imageURL: "assets/images/LukeSkywalker.jpeg",

    },
    sidious: {
        name: "Darth Sidious",
        imageURL: "assets/images/DarthSidious.jpeg",
    },
    maul: {
        name: "Darth Maul",
        imageURL: "assets/images/DarthMaul.jpeg",
    },


}


var playerCharacter;
var enemies;
var defender;


    $(".availChar").click(function () {
        playerCharacter = ($(this).attr("value"))
        $(this).appendTo("#playerCharacter").removeClass("btn availChar").addClass( "player" );

        $('#players').children().appendTo("#enemies").removeClass( "availChar" ).addClass( "enemy" );
    })

    $(document).on('click', '.enemy', function () {
        defender = ($(this).attr("value"))
        $(this).appendTo("#defender").removeClass("btn").addClass( "defender" );
    })

    

})
