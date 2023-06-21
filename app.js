// backend code for the rock paper scissors game

// grab the html element that we want to access
let presentChoice = document.getElementById("displayChoice");
let cpuserSelection = document.getElementById("battle");
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
    presentChoice.innerHTML += "<br>" + "You chose: " + userSelection;
    return userSelection;
}

// Function that generates the CPU choice
function getComputerChoice() {
    let choice = (Math.floor(Math.random()*3) + 1)
    if (choice === 1) {
        cpuserSelection.innerHTML = "rock";
        return "rock";
    } else if (choice === 2) {
        cpuserSelection.innerHTML = "paper";
        return "paper";
    } else {
        cpuserSelection.innerHTML = "scissors";
        return "scissors";
    }
}

// Function for main game logic
function playGame(userSelection, cpuserSelection) {
    // scenarios where you would win
    if (
        (cpuserSelection === "rock" && userSelection === "paper") || 
        (cpuserSelection === "paper" && userSelection === "scissors") || 
        (cpuserSelection === "scissors" && userSelection === "rock")
        ) {
            console.log("You win!")
    // scenario where you tie
    } else if (cpuserSelection === userSelection) {
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