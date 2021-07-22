const optionBtn = document.querySelectorAll('div.optionBtn button');
const roundResults = document.querySelector('#roundResults');
const playerPoints = document.querySelector('#playerScore');
const computerPoints = document.querySelector('#computerScore');
const resetBtn = document.querySelector('#reset');

//refresh page for new game
resetBtn.addEventListener('click',() => location.reload());
  
optionBtn.forEach(button => { button.addEventListener('click', getPlayerChoice) });

let computerChoices = [{choice: 'Rock', value: 0}, {choice: 'Paper', value: 1}, {choice: 'Scissors', value: 2}];
let playerScore = 0;
let compScore = 0;
let playerChoice;

function computerPlay () {
  let result = computerChoices[Math.floor(Math.random() * computerChoices.length)];
  return result;
}

function playRound (playerSelection, computerSelection) {
  let roundWinCombo = `${playerSelection}-${computerSelection.value}`;
  let playerWinCombo = ['1-0', '0-2', '2-1'];

    if (Number(playerSelection) === computerSelection.value) {
      playerPoints.textContent = ++playerScore
      computerPoints.textContent = ++compScore
      playerPoints.style.color="red";
      computerPoints.style.color="red";
      roundResults.textContent = "Tie"
      roundResults.style.color="red";
    }else if (playerWinCombo.includes(roundWinCombo)) {
        playerPoints.textContent = ++playerScore
        playerPoints.style.color="red";
        roundResults.textContent = `You won! ${playerChoice} beats ${computerSelection.choice}`;
        roundResults.style.color="red";
    }else {
        computerPoints.textContent = ++compScore
        computerPoints.style.color="red";
        roundResults.textContent = `You Lost ${computerSelection.choice} beats ${playerChoice}`;
        roundResults.style.color="red";
    }
 checkWinner();
}

const winnerResults ={
  computer: ["You Lose :(", 'red'],
  player: ["You Won!!!!", 'green'],
  tie: ["Tie!", 'blue']
}

function checkWinner() {
  if (compScore === 5 || playerScore === 5) {
    if (compScore === playerScore){
      updateWinner('tie')
    }else{
      let win = `${(compScore > playerScore) ? 'computer' : 'player'}`;
      updateWinner(win);
    }
  }
}

function updateWinner(winner){
  roundResults.textContent = winnerResults[winner][0];
  roundResults.style.color = winnerResults[winner][1];

  optionBtn.forEach(button => {
    button.removeEventListener('click', getPlayerChoice);
  });
}

function getPlayerChoice(e) {
  let playerSelection= (e.target.id);
  playerChoice = e.target.textContent;
  playRound(playerSelection, computerPlay());
}