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

// Function for the user's choice
let userSelection
function userChoice(choice) {
    userSelection = choice;
    playerChoice.innerHTML = "You chose: " + userSelection;
    return userSelection;
}

// Function that generates the CPU choice
function getComputerChoice() {
    let choice = (Math.floor(Math.random()*3) + 1)
    if (choice === 1) {
        cpuChoice.innerHTML = "The CPU chose: rock";
        return "rock";
    } else if (choice === 2) {
        cpuChoice.innerHTML = "The CPU chose: paper";
        return "paper";
    } else {
        cpuChoice.innerHTML = "The CPU chose: scissors";
        return "scissors";
    }
}

// Function for main game logic
function playGame(userSelection, cpuChoice) {
    // scenarios where you would win
    if (
        (cpuChoice === "rock" && userSelection === "paper") || 
        (cpuChoice === "paper" && userSelection === "scissors") || 
        (cpuChoice === "scissors" && userSelection === "rock")
        ) {
            console.log("You win!")
    // scenario where you tie
    } else if (cpuChoice === userSelection) {
        console.log("You tied!")
    } else {
        console.log("You Lost!")
    }
}

// Loop to play x rounds
let round = 1;
function playRounds() {
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

// Function to start the countdown
function countdown() {
    // Disable the start button
    startButton.disabled = true;
    let countdown = countdownDuration;
    countdownDisplay.textContent = countdown;

    const countdownInterval = setInterval(() => {
        countdown--;
        countdownDisplay.textContent = countdown;
        // add boolean to check if user has made a move, if no move was made then give the cpu a win
        if (countdown === 0) {
            clearInterval(countdownInterval);
            console.log("Coundown finished! CPU has decided!");
            playRounds();
        }
    }, 1000);
}

// Event listener for start button
startButton.addEventListener("click", () => {
    showOptions();
    countdown();
});