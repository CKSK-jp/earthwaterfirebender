// backend code for the rock paper scissors game

// grab the html element that we want to access
let playerChoice = document.getElementById("playerChoice");
let cpuChoice = document.getElementById("cpuChoice");
let scoreboard = document.getElementById("scoreboard");
let playerResult = document.getElementById("playerResult");
let cpuResult = document.getElementById("cpuResult");
let endScreen = document.getElementById("endResult");
let playerFinal = document.getElementById("playerFinal");
let cpuFinal = document.getElementById("cpuFinal");
let countdownDisplay = document.getElementById("countDown");
let startButton = document.getElementById("startButton");

// Function to toggle between the start and game screen
function startGame() {
    document.getElementById("startScreen").style.display = "none";
    document.getElementById("gameScreen").style.display = "block";
    document.getElementById("endScreen").style.display = "none";
}

// Function to show results and ask if the player would like to play again
function playAgain() {
    document.getElementById("startScreen").style.display = "none";
    document.getElementById("gameScreen").style.display = "none";
    document.getElementById("endScreen").style.display = "block";

    playerChoice.src = "./photos/unknown.jpeg";
    cpuChoice.src = "./photos/unknown.jpeg";

    scores.playerScore = 0;
    scores.cpuScore = 0;
    round = 1;
    scoreboard.textContent = `${scores.playerScore} vs. ${scores.cpuScore}`;
    playerResult.textContent = '';
    cpuResult.textContent = '';
}

// Function for the user's choice
let userSelection
function userChoice(choice) {
    userSelection = choice;

    if (playerChoice.firstChild) {
        playerChoice.removeChild(playerChoice.firstChild);
      }

    if (choice === 'rock') {
        playerChoice.src = './photos/playerEarth.jpeg';
    } else if (choice === 'paper') {
        playerChoice.src = './photos/playerFire.jpeg';
    } else {
        playerChoice.src = './photos/playerWater.jpeg';
    }
    countdown(); // Start the countdown after the user makes a selection
    return userSelection;
}

// Function that generates the CPU choice
function getComputerChoice() {
    let choice = (Math.floor(Math.random()*3) + 1)

    // Check if there is already an image in the container
    if (cpuChoice.firstChild) {
        cpuChoice.removeChild(cpuChoice.firstChild);
      }

    if (choice === 1) {
        cpuChoice.src = './photos/cpuEarth.jpeg';
        return "rock";
    } else if (choice === 2) {
        cpuChoice.src = './photos/cpuFire.jpeg';
        return "paper";
    } else {
        cpuChoice.src = './photos/cpuWater.jpeg';
        return "scissors";
    }
}

// Function for main game logic
function playGame(userSelection, playerScore, cpuScore) {
    let cpuAnswer = getComputerChoice();
    console.log(`The CPU selected ${cpuAnswer}. Your selection: ${userSelection}`);
    // fire vs rock win for player
    if (userSelection === "paper" && cpuAnswer === "rock") {
        playerResult.textContent = "You Won!";
        cpuResult.textContent = "You Lost!";
        scores.playerScore++;
        // ending screen preempt
        cpuFinal.src = './photos/lossByFire.jpeg';
        playerFinal.src = './photos/playerFire.jpeg';
    // water vs fire win for player
    } else if (userSelection === "scissors" && cpuAnswer === "paper") {
        playerResult.textContent = "You Won!";
        cpuResult.textContent = "You Lost!";
        scores.playerScore++;
        cpuFinal.src = './photos/lossByWater.jpeg';
        playerFinal.src = './photos/playerWater.jpeg';
    // earth vs water win for player
    } else if (userSelection === "rock" && cpuAnswer === "scissors") {
        playerResult.textContent = "You Won!";
        cpuResult.textContent = "You Lost!";
        scores.playerScore++;
        cpuFinal.src = './photos/lossByEarth.jpeg';
        playerFinal.src = './photos/playerEarth.jpeg';
       
    // cpu wins with fire
    } else if (cpuAnswer === "paper" && userSelection === "rock") {
        playerResult.textContent = "You Lost!";
        cpuResult.textContent = "You Won!";
        scores.cpuScore++;
        playerFinal.src = './photos/lossByFire.jpeg';
        playerFinal.style.transform = 'scaleX(-1)';
        cpuFinal.src = './photos/cpuFire.jpeg';
    // cpu wins with Water
    } else if (cpuAnswer === "scissors" && userSelection === "paper") {
        playerResult.textContent = "You Lost!";
        cpuResult.textContent = "You Won!";
        scores.cpuScore++;
        playerFinal.src = './photos/lossByWater.jpeg';
        cpuFinal.src = './photos/cpuWater.jpeg';
    // cpu wins with Earth
    } else if (cpuAnswer === "rock" && userSelection === "scissors") {
        playerResult.textContent = "You Lost!";
        cpuResult.textContent = "You Won!";
        scores.cpuScore++;
        playerFinal.src = './photos/lossByEarth.jpeg';
        cpuFinal.src = './photos/cpuEarth.jpeg';
    } else {
        playerResult.textContent = "You Tied!";
        cpuResult.textContent = "You Tied!";
    }
    return [playerScore, cpuScore];
}

// Stop after x wins
let round = 1;
let scores = {playerScore: 0, cpuScore: 0};
let winCondition = 3;

function playRound() {
    console.log(`--- Round ${round} ---`)
    playGame(userSelection, scores);
    if (scores.playerScore === winCondition) {
        playAgain();
        endScreen.textContent = `The winner is: YOU!`;
    } else if (scores.cpuScore === winCondition){
        playAgain();
        endScreen.textContent = `The winner is: THE CPU!`;
    } else {
        round++;
        scoreboard.textContent = `${scores.playerScore} vs. ${scores.cpuScore}`;
    }
}

// Variable to track if the countdown is running
let isCountdownRunning = false;
const countdownDuration = 3;

// Function to start the countdown
function countdown() {
    if (isCountdownRunning) {
        return;
    }
    isCountdownRunning = true;

    let countdown = countdownDuration;
    countdownDisplay.textContent = countdown;

    const countdownInterval = setInterval(() => {
        countdown--;
        countdownDisplay.textContent = countdown;
        // add boolean to check if user has made a move, if no move was made then give the cpu a win
        if (countdown === 0) {
            clearInterval(countdownInterval);
            playRound();
            isCountdownRunning = false; // Reset the countdown running flag
        }
    }, 1000);
}

// Event listener for start button
startButton.addEventListener("click", () => {
    startGame();
    // Disable the start button
    startButton.disabled = true;
});