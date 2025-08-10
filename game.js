var buttonColors = ['blue', 'green', 'red', 'yellow'];
var gamePattern = [];
var userPattern = []
var started = false;
var level = 0;

$(document).keydown(function(event) {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").on('click', function(){
    var userColor = $(this).attr("id");
    userPattern.push(userColor);

    //console.log("User " + userPattern)

    playSound(userColor);
    animatePress(userColor);

    checkAnswer((userPattern.length - 1));
});

function nextSequence() {
    userPattern = []
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomColor = buttonColors[randomNumber];
    gamePattern.push(randomColor);

    //console.log("Game " + gamePattern)

    $("#" + randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomColor)
}

function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed")
    }, 100);
}

function checkAnswer(currentLevel) {
    //console.log(currentLevel)
    //console.log("game " + gamePattern[currentLevel])
    //console.log("user " + userPattern[currentLevel])

    if (userPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");
        if (userPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }

    } else {
        console.log("wrong");

        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over")
        }, 200);

        $("#level-title").text("Game Over! Press Any Key To Restart.");

        startOver();
    }
}

function startOver() {
    started = false;
    level = 0;
    gamePattern = [];
    userPattern = [];
}