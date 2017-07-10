var game = {
    // Variable definitions
    wins: 0,
    losses: 0,
    randomNum: 0,
    userSum: 0,
    crystalValues: [],
    randomFactors: [],
    // Function definitions
    // Finds crystal values for clickable images
    randomCrystalValues: function() {
        var num = 12;
        var currentNum = 0;
        this.crystalValues = [];

        for (var i = 0; i < 4; i++) {
            do {
                currentNum = Math.ceil(Math.random() * num);
            } while (this.crystalValues.includes(currentNum))
            this.crystalValues.push(currentNum);
        }
    },
    // Assigns values to each crystal button
    assignValues: function() {
        $("#crystal1").attr("value", this.crystalValues[0]);
        $("#crystal2").attr("value", this.crystalValues[1]);
        $("#crystal3").attr("value", this.crystalValues[2]);
        $("#crystal4").attr("value", this.crystalValues[3]);
    },
    // Finds factors to find the random sum
    randomFactorValues: function() {
        var num = 3;
        var currentNum = 0;
        this.randomFactors = [];

        for (var i = 0; i < 4; i++) {
            currentNum = Math.ceil(Math.random() * num);
            this.randomFactors.push(currentNum);
        }

    },
    // Arriving at the sum
    defineSum: function() {

        this.randomCrystalValues();
        this.randomFactorValues();
        this.randomNum = 0;

        for (var i = 0; i < this.crystalValues.length; i++) {
            this.randomNum = this.randomNum + (this.crystalValues[i] * this.randomFactors[i]);
        }
    },
    // Printing numbers to user
    fillHTML: function() {
        $("#dispRand").html(this.randomNum);
        $("#winTotal").html(this.wins);
        $("#lossTotal").html(this.losses);
        $("#sum").html(this.userSum);
    },
    // Restart
    resetGame: function() {
        this.randomNum = 0;
        this.userSum = 0;
        this.crystalValues = [];
        this.randomFactors = [];
    },
    // Game method
    crystalGame: function() {
        game.defineSum();
        game.fillHTML();
        game.assignValues();

        $(".crystalGroup").on("click", function() {
            var newValue = $(this).attr("value");
            game.userSum += parseInt(newValue);
            game.fillHTML();

            if (game.userSum === game.randomNum) {
                game.wins++;
                $("#gamemessage").text("Hurray, we've freed the ugly princess.. She's yours bud.");
                game.resetGame();
                game.defineSum();
                game.assignValues();
                game.fillHTML();
            }
            if (game.userSum > game.randomNum) {
                game.losses++;
                $("#gamemessage").text("HA! Loser.");
                game.resetGame();
                game.defineSum();
                game.assignValues();
                game.fillHTML();
            }
        })

    }
};
$(document).ready(function() {

    game.crystalGame();

})
