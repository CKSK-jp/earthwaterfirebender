// backend code for the rock paper scissors game

// grab the html element that we want to access
let playerChoice = document.getElementById("playerChoice");
let cpuChoice = document.getElementById("cpuChoice");
const countdownDuration = 3;
const countdownDisplay = document.getElementById("countDown");
const startButton = document.getElementById("startButton");

// Function to toggle between the start and game screen
function showOptions() {
    document.getElementById("startScreen").style.display = "none";
    document.getElementById("optionsScreen").style.display = "block";
}

var playerImg = document.createElement('img');
// Function for the user's choice
let userSelection
function userChoice(choice) {
    userSelection = choice;

    if (playerChoice.firstChild) {
        playerChoice.removeChild(playerChoice.firstChild);
      }

    if (choice === 'rock') {
        playerImg.src = './photos/rock.png';
        playerChoice.appendChild(playerImg);
    } else if (choice === 'paper') {
        playerImg.src = './photos/paper.png';
        playerChoice.appendChild(playerImg);
    } else {
        playerImg.src = './photos/scissors.png';
        playerChoice.appendChild(playerImg);
    }
    countdown(); // Start the countdown after the user makes a selection
    return userSelection;
}

var cpuImg = document.createElement('img');
// Function that generates the CPU choice
function getComputerChoice() {
    let choice = (Math.floor(Math.random()*3) + 1)

    // Check if there is already an image in the container
    if (cpuChoice.firstChild) {
        cpuChoice.removeChild(cpuChoice.firstChild);
      }

    if (choice === 1) {
        cpuImg.src = './photos/rock.png';
        cpuChoice.appendChild(cpuImg);
        return "rock";
    } else if (choice === 2) {
        cpuImg.src = './photos/paper.png';
        cpuChoice.appendChild(cpuImg);
        return "paper";
    } else {
        cpuImg.src = './photos/scissors.png';
        cpuChoice.appendChild(cpuImg);
        return "scissors";
    }
}

// Function for main game logic
function playGame(userSelection, cpuSelection) {
    // scenarios where you would win
    if (
        (cpuSelection === "rock" && userSelection === "paper") || 
        (cpuSelection === "paper" && userSelection === "scissors") || 
        (cpuSelection === "scissors" && userSelection === "rock")
        ) {
            console.log("You Won!")
    // scenario where you tie
    } else if (cpuSelection === userSelection) {
        console.log("You Tied!")
    } else {
        console.log("You Lost!")
    }
}

// Loop to play x rounds
let round = 1;
function playRound() {
    if (round <= 5) {
        console.log(`--- Round ${round} ---`)
        let cpuAnswer = getComputerChoice();
        console.log(`The CPU selected ${cpuAnswer}. Your selection: ${userSelection}`);
        playGame(userSelection, cpuAnswer);
        round++;
        countdown();
    } else {
        console.log("Game Over!");
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
            console.log("Coundown finished! CPU has decided!");
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