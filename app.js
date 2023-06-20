// backend code for the rock paper scissors game
function showOptions() {
    document.getElementById("startScreen").style.display = "none";
    document.getElementById("optionsScreen").style.display = "block";
}

// grab the html element that we want to access
let presentChoice = document.getElementById("displayChoice");
let userSelection
function userChoice(choice) {
    userSelection = choice;
    presentChoice.innerHTML += "<br>" + "You chose: " + userSelection;
    return userSelection;
}

// Fn that generates the CPU choice
// grab the html element that we want to access
let cpuserSelection = document.getElementById("battle");
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


function playGame(userSelection, cpuserSelection) {
    // scenarios where you would win
    if ((cpuserSelection === "rock" && userSelection === "paper") || (cpuserSelection === "paper" && userSelection === "scissors") || (cpuserSelection === "scissors" && userSelection === "rock")) {
        console.log("You win!")
    // scenario where you tie
    } else if (cpuserSelection === userSelection) {
        console.log("You tied!")
    } else {
        console.log("You Lost!")
    }
}

// Countdown duration in seconds
const countdownDuration = 3;
// Get the countdown display element
const countdownDisplay = document.getElementById("countDown");

startButton.addEventListener("click", () => {
    // Disable the start button
    startButton.disabled = true;

    // Start the countdown
    let countdown = countdownDuration;
    countdownDisplay.textContent = countdown;

    const countdownInterval = setInterval(() => {
        countdown--;
        countdownDisplay.textContent = countdown;
        if (countdown === 0) {
            clearInterval(countdownInterval);
            // Perform additional actions after the countdown finishes
            let cpuAnswer = getComputerChoice();
            console.log("Countdown finished! CPU has decided!");
            console.log("The cpu selectd: " + cpuAnswer + " .vs your selection: " + userSelection);
            playGame(userSelection, cpuAnswer);
        }
    }, 1000);
});