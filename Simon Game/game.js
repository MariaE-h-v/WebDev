//variables
var buttonsColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var bestScore = 0;
var scoreName = "";
//listeners
$(".btn").click(function () {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length -1);
});

$(document).keypress(function(){
    if(level ===0){
        $("h1").text("Level " + level);
        newName = prompt("Name");
        nextSecuence();
    }
})

//functions
function nextSecuence() {
    var randomNUmber = Math.floor(Math.random() * 3);
    var randomColor = buttonsColors[randomNUmber];
    gamePattern.push(randomColor);
    $("#" + randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
    var audio = new Audio("sounds/" + randomColor + ".mp3");
    audio.play();
    level += 1;
    $("h1").text("Level " + level);
    $("h3").text(scoreName+ " " + bestScore );
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(() => {
        $("#" + currentColor).removeClass("pressed");
    }
        , 100);
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("yes");
        if (currentLevel === gamePattern.length-1){
            setTimeout(nextSecuence,1000);
            userClickedPattern = [];
        }
    }
    else{
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(()=>{$("body").removeClass("game-over");}, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        bestLevel(level);
        startOver();   
    }
}

function startOver(){
    level = 0;
    gamePattern= [];
    userClickedPattern = [];
}
function bestLevel(currentlevel){
    if (currentlevel>bestScore){
        bestScore = currentlevel;
        scoreName =newName;
    }
}