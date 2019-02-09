//hp = health points
//ap = attack power
//cap = counter attack power

var characters = {
    obi: {
        name: "Obi Wan Kenobi",
        hp: 120,
        ap: 8,
        cap: 13,
        src: "assets/images/ObiWanKenobi.jpeg",
    },
    luke: {
        name: "Luke Skywalker",
        hp: 100,
        ap: 7,
        cap: 9,
        src: "assets/images/LukeSkywalker.jpeg",

    },
    sidious: {
        name: "Darth Sidious",
        hp: 150,
        ap: 6,
        cap: 11,
        src: "assets/images/DarthSidious.jpeg",
    },
    maul: {
        name: "Darth Maul",
        hp: 180,
        ap: 5,
        cap: 15,
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



$(document).on('click', '.character', function(){

    if (!player) {
        player = $(this).attr("value");
        $(this).detach().appendTo('#player')
        powerIncrement = characters[player].ap;
        $(this).attr("disabled", "disabled").css("background-color", "#4b923a"); //disable button, can't change player.
    
     
    } else if (!defender) {
        defender = $(this).val();
        $(this).detach().appendTo('#defender')
        $(this).attr("disabled", "disabled").css("background-color", "#b3201a"); //disable button, can't change defender after selection.
        populateEnemy();
        maintainEnemy();


    }
})

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
    enemy.forEach(element => {
        $("."+element).detach().appendTo('#enemy').css("background-color", "#81887f")
    });
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
    $("#ap").html("You've attacked with "+characters[player].ap+" attack points.");
    $("#cap").html(characters[defender].name+" responded with "+characters[defender].cap+" counter attack points.");

    gameStats();

})

function gameStats() {
    if (characters[player].hp <=0 && characters[defender].ph<=0 ){
        $("#ap").toggle().html("It's a draw!")
        $("#cap").hide(); 
    }
    else if (characters[player].hp <= 0){
        $("#ap").show().html("You lost! Game Over!")
        $("#cap").hide();
        $(".attack").attr("disabled", "disabled");
    }
    else if (characters[defender].hp <= 0) {
        $("."+defender).remove();
        $("#ap").toggle();
        $("#cap").toggle();
        delete characters[defender];
        defender = "";

        if (!enemy.length) {
            $("#ap").toggle().html("You Win!")
            $("#cap").hide();
        } else {
            $("#ap").toggle().html("You won this round")
            $("#cap").toggle().html("Select next defender!");
        }
    }
}


