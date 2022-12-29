const buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = []; 
let userClickedPattern = []; 

var started = true; 
var level = 0; 

$(document).keydown(function(){
    if (started){
        nextSequence();
        started = false; 
    }
});

function nextSequence(){
    // generates num between 0-1 
    let num = Math.random(); 
    // num between 0-3 
    let randomNumber = Math.floor(num * 4); 
    let randomChosenColour = buttonColours[randomNumber]; 
    gamePattern.push(randomChosenColour);

    // flash the random button and play the audio
    var randomButton = $("#"+randomChosenColour);
    randomButton.fadeOut(100).fadeIn(100); 

    playSound(randomChosenColour)

    level++; 
    $("h1").text("Level " + level.toString()); 
}

function handler(){
    var userChosenColor = this.id; //clicked button id 
    userClickedPattern.push(userChosenColor); 
    console.log(userClickedPattern);
    playSound(userChosenColor);
    animatePress(userChosenColor);

    lastAnsIndex = userClickedPattern.length - 1; 
    checkAnswer(lastAnsIndex);
}
// when calling a function as a parameter, just write its name 
$(".btn").click(handler); 


// helper functions 
function playSound(name){
    var soundName = 'sounds/' + name + '.mp3';
    var colourSound = new Audio(soundName); 
    colourSound.play(); 
}


function animatePress(currentColour){
    // setTimeout(animatePress,100);
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    },100);
}


function startOver(){
    level = 0; 
    gamePattern = []; 
    userClickedPattern = [];
    started = true;
}


function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success!")

        if (userClickedPattern.length === gamePattern.length){
            console.log("right");
            setTimeout(nextSequence, 1000); 
            // for the new click
            userClickedPattern = []; 
        }
    } else {
        console.log("wrong"); 

        var wrongAudio = new Audio('sounds/wrong.mp3'); 
        wrongAudio.play(); 

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over")
        },200);

        $("h1").text("Game over, Press Any Key to Restart");

        startOver(); 
    }
}








