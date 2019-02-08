//hp = health points
//ap = attack power
//cap = counter attack power

var characters = {
    obi: {
        name: "Obi Wan Kenobi",
        hp: 120,
        ap: 8,
        cap: 6,
        src: "assets/images/ObiWanKenobi.jpeg",
    },
    luke: {
        name: "Luke Skywalker",
        hp: 100,
        ap: 3,
        cap: 5,
        src: "assets/images/LukeSkywalker.jpeg",

    },
    sidious: {
        name: "Darth Sidious",
        hp: 150,
        ap: 9,
        cap: 20,
        src: "assets/images/DarthSidious.jpeg",
    },
    maul: {
        name: "Darth Maul",
        hp: 180,
        ap: 6,
        cap: 25,
        src: "assets/images/DarthMaul.jpeg",
    }
}


function loadCharacters(){
    for(key in characters){
        $("<button/>",{
            'class': `${key}  character`,
            'value': key,
            'html': ('<img src='+characters[key].src+'>' + '<p>'+characters[key].name +'<p id='+key+'>'+ characters[key].hp),
            
        }).prependTo("#setup")
    }
}

loadCharacters();




var player = "";
var defender = "";
var enemy = [];
var powerIncrement;




// function pageSetup() {
//     $(".obi").html(characters.obi["name"] + "   " + characters.obi["hp"]);
//     $(".luke").html(characters.luke["name"] + "   " + characters.luke["hp"]);
//     $(".sidious").html(characters.sidious["name"] + "   " + characters.sidious["hp"]);
//     $(".maul").html(characters.maul["name"] + "   " + characters.maul["hp"]);
// }
//pageSetup();

$(document).on('click', '.character', function(){

    if (!player) {
        player = $(this).attr("value");
        powerIncrement = characters[player].ap;
        console.log("this is the player: " + player);
        $(this).attr("disabled", "disabled"); //disable button, can't change player.
    } else if (!defender) {
        defender = $(this).val();
        console.log("this is the defender: " + defender)
        $(this).attr("disabled", "disabled"); //disable button, can't change defender after selection.
        populateEnemy();
        maintainEnemy();

    }
})

// $(".character").click(function () {
//     if (!player) {
//         player = $(this).attr("value");
//         powerIncrement = characters[player].ap;
//         console.log("this is the player: " + player);
//         $(this).attr("disabled", "disabled"); //disable button, can't change player.
//     } else if (!defender) {
//         defender = $(this).val();
//         console.log("this is the defender: " + defender)
//         $(this).attr("disabled", "disabled"); //disable button, can't change defender after selection.
//         populateEnemy();
//         maintainEnemy();

//     }
// })

function populateEnemy() {
    for (var key in characters) {
        if (key !== player && key !== defender && enemy.indexOf(key) === -1)
            enemy.push(key);
    };
}
function maintainEnemy() {
    enemy = enemy.filter(function (e) {
        return e != defender;
    })
}


$(".attack").click(function () {
    //player attack
    characters[defender].hp = characters[defender].hp - characters[player].ap;
    characters[player].ap = characters[player].ap + powerIncrement;
    console.log(characters[player].ap);

    //defender response
    characters[player].hp = characters[player].hp - characters[defender].cap;

    //update stats
    $("#" + defender).html(characters[defender].hp);
    $("#" + player).html(characters[player].hp);

    gameStats();

})

function gameStats() {
    if (characters[player].hp <=0){
        var message = characters[defender].ph<=0 ? "It's a draw!" : "You lose! Game Over";
        alert(message);
    }
    else if (characters[defender].hp <= 0) {
        delete characters[defender];
        defender = "";

        if (!enemy.length) {
            alert("You win!");
        } else {
            alert("Select defender!");
        }
    }
}


