// To Do:
// Game reset.
// readme file describing project
// update portfolio 
//soft delete dude from the dictionary. 

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
        isActive: true,
    },
    luke: {
        name: "Luke Skywalker",
        hp: 100,
        ap: 7,
        cap: 9,
        src: "assets/images/LukeSkywalker.jpeg",
        isActive: true,
    },
    sidious: {
        name: "Darth Sidious",
        hp: 150,
        ap: 6,
        cap: 11,
        src: "assets/images/DarthSidious.jpeg",
        isActive: true,
    },
    maul: {
        name: "Darth Maul",
        hp: 180,
        ap: 5,
        cap: 15,
        src: "assets/images/DarthMaul.jpeg",
        isActive: true,
    }
}

var player;
var defender;
var enemy = [];
var playerHP;
var playerAP;
var defenderHP;


function loadCharacters() {
    for (key in characters) {
        $("<button/>", {
            'class': `${key}  character`,
            'value': key,
            'html': `<img src="${characters[key].src}"/><p>${characters[key].name}</p><p id=${key}>${characters[key].hp}</p>`,
        }).prependTo("#setup")
    }
}

function populateEnemy() {
    for (var key in characters) {
        if (key !== player && enemy.indexOf(key) === -1)
            enemy.push(key);
    };
}

function maintainEnemy() {
    enemy = enemy.filter(function (e) {
        return e != defender;
    });
    enemy.forEach(element => {
        $(`.${element}`).detach().appendTo('#enemy').css("background-color", "#81887f");
    });
}

function inProgressStats() {
    $("#" + defender).html(defenderHP);
    $("#" + player).html(playerHP);
    $("#note1").show().html(`You've attacked with ${playerAP} attack points. <br> ${characters[defender].name} responded with ${characters[defender].cap} counter attack points.`);
}

function gameStats() {
    if (playerHP <= 0 && defenderHP <= 0) {
        $("#note1").html("It's a draw!")
        $(".attack").hide();
        $(".restart").show();
    }
    else if (playerHP <= 0) {
        $("#note1").html("You lost! Game Over!")
        $(".attack").hide();
        $(".restart").show();
    }
    else if (defenderHP <= 0) {
        $("." + defender).remove();
        $("#note1").hide();
        defender="";

        if (!enemy.length) {
            $("#note1").show().html("You Win!")
            $(".attack").hide();
            $(".restart").show();
        } else {
            $("#note1").show().html("You won this round! <br> Select next defender to continue playing.")
        }
    }
}

function gameReset() {
    for (var key in characters) {
        $("." + key).remove();
    };
    player="";
    defender="";
    enemy = [];
    playerHP=0;
    playerAP=0;
    defenderHP=0;
    loadCharacters()
    $(".restart").hide();
    $("#note1").show().html("Pick a player and a defender.")
}

$(document).ready(function () {
    loadCharacters();
    $(document).on('click', '.character', function () {
        if (!player) {
            player = $(this).attr("value");
            $(this).detach().appendTo('#player')
            playerHP = characters[player].hp;
            playerAP = characters[player].ap;
            $(this).attr("disabled", "disabled").css("background-color", "#4b923a");
            populateEnemy();
            maintainEnemy();

        } else if (!defender) {
            defender = $(this).val();
            defenderHP = characters[defender].hp;
            $(this).detach().appendTo('#defender')
            $(this).attr("disabled", "disabled").css("background-color", "#b3201a");
            maintainEnemy();
            $(".attack").show();
            $("#note1").hide();
        }
    })
    $(".attack").click(function () {
        defenderHP -= playerAP;
        playerHP -= characters[defender].cap;
        inProgressStats();
        playerAP += characters[player].ap;
        gameStats();
    })
    $(".restart").click(function () {
        gameReset();
    })
});