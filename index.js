const buttonColor = ["red", "blue", "yellow", "green"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var isStarted = false;

$("body").keypress(function() {
    if(!isStarted) {
        nextSequence();
        isStarted = true;
    }
});

$("button").click(function() {
    var userChosenColor = $(this).attr("id");
    playSound(userChosenColor);
    animateButton($(this), userChosenColor);
    userClickedPattern.push(userChosenColor);
    checkPattern(userClickedPattern.length - 1);
});

//Function to generate a random color click
function nextSequence() {
    userClickedPattern = [];
    level += 1;
    updateLevelTitle("Level " + level);
        
    var randInt = Math.floor(Math.random() * 4);
    var randomColor = buttonColor[randInt];

    gamePattern.push(randomColor);
    chosenButton = $("#" + randomColor);
    playSound(randomColor);
    chosenButton.fadeOut(100).fadeIn(100);
}

//Function to check pattern against user clicked pattern
function checkPattern(level) {
    if(userClickedPattern[level] === gamePattern[level]) {
        if(userClickedPattern.length === gamePattern.length) {
            setTimeout(nextSequence, 1000);
        }
    } else {
        gameOver();
    }
}

//Helper function to play sound corresponding to a color or action
function playSound(color) {
    new Audio("assets/sounds/" + color + ".mp3").play();
}

//Helper function to animate a button
function animateButton(button, color) {
    button.toggleClass("animated-" + color);
    setTimeout(function() {
        button.toggleClass("animated-" + color);
    }, 100);
}

//Helper function to update title
function updateLevelTitle(level) {
    $("h1").text(level);
}

//Function to reset the game
function gameOver() {
    $("body").toggleClass("danger");
    setTimeout(() => {
        $("body").toggleClass("danger");
    }, 150);

    playSound("wrong");
    updateLevelTitle("Game over. Press a key to start.");
    level = 0;
    userClickedPattern = [];
    gamePattern = [];
    isStarted = false;
}