//hp = health points
//ap = attack power
//cap = counter attack power

var characters = {
    obi: {
        name: "Obi Wan Kenobi",
        hp: 120,
        ap: 8,
        cap: 6,
    },
    luke: {
        name: "Luke Skywalker",
        hp: 100,
        ap: 3,
        cap: 5,

    },
    sidious: {
        name: "Darth Sidious",
        hp: 150,
        ap: 9,
        cap: 20,
    },
    maul: {
        name: "Darth Maul",
        hp: 180,
        ap: 6,
        cap: 25,
    }
}





var player = "";
var defender = "";
var enemy = [];
var powerIncrement;



$(document).ready(function () {


    function pageSetup() {
        $(".obi").html(characters.obi["name"] + "   " + characters.obi["hp"]);
        $(".luke").html(characters.luke["name"] + "   " + characters.luke["hp"]);
        $(".sidious").html(characters.sidious["name"] + "   " + characters.sidious["hp"]);
        $(".maul").html(characters.maul["name"] + "   " + characters.maul["hp"]);
    }
    pageSetup();

    $(".character").click(function () {
        if (!player) {
            player = $(this).attr("value");
            powerIncrement = characters[player].ap;
            console.log("this is the player: " + player);
        } else if (!defender) {
            defender = $(this).val();
            console.log("this is the defender: " + defender)
        }
        else {
            enemy.push($(this).val());
            console.log("this is the list of enemies: " + enemy)
        }
    })

    $(".attack").click(function () {
        //player attack
        characters[defender].hp = characters[defender].hp - characters[player].ap;
        characters[player].ap = characters[player].ap + powerIncrement;
        console.log(characters[player].ap);
        
        //defender response
        characters[player].hp = characters[player].hp - characters[defender].cap;

        //update stats
        $("."+defender).html(characters[defender].hp);
        $("."+player).html(characters[player].hp);

        confirmStats();

    })

    function confirmStats(){
        if(characters[player].hp<=0){
            alert("You lose! Game Over")
        }
        else if(characters[defender].hp <= 0){
            defender="";
            if(!enemy){
                alert("You win!")
            }else{
                alert("Select defender!")
            }
        }
    }






});

