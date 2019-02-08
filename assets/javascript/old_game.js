$(document).ready(function () {

    // var obj = {
    //     'row1' : {
    //         'key1' : 'input1',
    //         'key2' : 'input2'
    //     },
    //     'row2' : {
    //         'key3' : 'input3',
    //         'key4' : 'input4'
    //     }
    // };
    // obj.row1.key1 == 'input1';
    // obj.row1.key2 == 'input2';
    // obj.row2.key1 == 'input3';
    // obj.row2.key2 == 'input4';

    var obi = {
        name : "Obi Wan Kenobi",
        healthPoints : 120,
        attackPower : 8,
        counterAttackPower : 6,
        player : false,
        defender : false,
        
    };
    var luke = {
        name: "Luke Skywalker",
        healthPoints: 100,
        attackPower: 3,
        counterAttackPower: 5,

    };
    var sidious = {
        name: "Darth Sidious",
        healthPoints: 150,
        attackPower: 9,
        counterAttackPower: 20,
    };
    var maul = {
        name: "Darth Maul",
        healthPoints: 180,
        attackPower: 6,
        counterAttackPower: 25,
    };


    var playerChar = " ";
    var defenderChar = " ";

    $(".obiHealth").html(obi["healthPoints"]);
    $(".lukeHealth").html(luke["healthPoints"]);
    $(".sidiousHealth").html(sidious["healthPoints"]);
    $(".maulHealth").html(maul["healthPoints"]);

    $(".availChar").click(function () {
        $(this).appendTo("#playerCharacter").removeClass("btn availChar").addClass("player");
        playerChar = $(this).attr("value");
        $('#players').children().appendTo("#enemies").removeClass("availChar").addClass("enemy");



    })

    $(document).on('click', '.enemy', function () {
        $(this).appendTo("#defender").removeClass("btn").addClass("defender");
        defenderChar = $(this).attr("value");
    })










})
