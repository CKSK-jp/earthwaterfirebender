// backend code for the rock paper scissors game

// grab the html element that we want to access
let playerChoice = document.getElementById("playerChoice");
let cpuChoice = document.getElementById("cpuChoice");
let scoreboard = document.getElementById("scoreboard");
let playerResult = document.getElementById("playerResult");
let cpuResult = document.getElementById("cpuResult");
const countdownDuration = 3;
const countdownDisplay = document.getElementById("countDown");
const startButton = document.getElementById("startButton");

// Function to toggle between the start and game screen
function showOptions() {
    document.getElementById("startScreen").style.display = "none";
    document.getElementById("optionsScreen").style.display = "block";
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
    // scenarios where you would win, tie or lose
    if ((cpuAnswer === "rock" && userSelection === "paper") || 
        (cpuAnswer === "paper" && userSelection === "scissors") || 
        (cpuAnswer === "scissors" && userSelection === "rock")) 
        {
            playerResult.textContent = "You Won!";
            cpuResult.textContent = "You Lost!";
            scores.playerScore++;
        } else if (cpuAnswer === userSelection) {
            playerResult.textContent = "You Tied!";
            cpuResult.textContent = "You Tied!";
        } else {
            playerResult.textContent = "You Lost!";
            cpuResult.textContent = "You Won!";
            scores.cpuScore++;
    }
    return [playerScore, cpuScore];
}

// Loop to play x rounds
let round = 1;
let scores = {playerScore: 0, cpuScore: 0};

function playRound() {
    if (scores.playerScore === 5) {
        scoreboard.textContent = `The winner is: YOU!`;
    } else if (scores.cpuScore === 5){
        scoreboard.textContent = `The winner is: THE CPU!`;
    } else {
        console.log(`--- Round ${round} ---`)
        playGame(userSelection, scores);
        round++;
        scoreboard.textContent = `${scores.playerScore} vs. ${scores.cpuScore}`;
    }
}

// Variable to track if the countdown is running
let isCountdownRunning = false;

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
    showOptions();
    // Disable the start button
    startButton.disabled = true;
});