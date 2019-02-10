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
var powerIncrement;
var playerHP;
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
    $("#" + defender).html(characters[defender].hp);
    $("#" + player).html(characters[player].hp);
    $("#note1").html(`You've attacked with ${characters[player].ap} attack points. <br> ${characters[defender].name} responded with ${characters[defender].cap} counter attack points.`);
}

function gameStats() {
    if (characters[player].hp <= 0 && characters[defender].hp <= 0) {
        $("#note1").show().html("It's a draw!")
        $(".attack").hide();
        $(".restart").show();
    }
    else if (characters[player].hp <= 0) {
        $("#note1").show().html("You lost! Game Over!")
        $(".attack").hide();
        $(".restart").show();
    }
    else if (characters[defender].hp <= 0) {
        $("." + defender).remove();
        $("#note1").toggle();
        // delete characters[defender];
        defender = "";

        if (!enemy.length) {
            $("#note1").toggle().html("You Win!")
            $(".attack").hide();
            $(".restart").show();
        } else {
            $("#note1").toggle().html("You won this round! <br> Select next defender to continue playing.")
        }
    }
}

function gameReset() {
    for (var key in characters) {
        $("."+key).remove();
    };
    player = "";
    defender = "";
    enemy = [];
    powerIncrement=0;
    loadCharacters()
    $(".attack").show();
    $(".restart").hide();
    $("#note1").hide();

}

$(document).ready(function () {
    loadCharacters();
    $(document).on('click', '.character', function () {
        if (!player) {
            player = $(this).attr("value");
            $(this).detach().appendTo('#player')
            powerIncrement = characters[player].ap;
            $(this).attr("disabled", "disabled").css("background-color", "#4b923a"); //disable button, can't change player.
            populateEnemy();
            maintainEnemy();

        } else if (!defender) {
            defender = $(this).val();
            $(this).detach().appendTo('#defender')
            $(this).attr("disabled", "disabled").css("background-color", "#b3201a"); //disable button, can't change defender after selection.
            maintainEnemy();
        }
    })
    $(".attack").click(function () {
        characters[defender].hp -= characters[player].ap;
        characters[player].hp -= characters[defender].cap;
        inProgressStats();
        characters[player].ap += powerIncrement;
        gameStats();
    })
    $(".restart").click(function(){
        gameReset();
    })
});