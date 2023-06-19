// backend code for the rock paper scissors game

function getComputerChoice() {
    let choice = (Math.floor(Math.random()*3) + 1)
    if (choice === 1) {
        console.log("rock");
    } else if (choice === 2) {
        console.log("paper");
    } else {
        console.log("scissors");
    }
}

getComputerChoice()