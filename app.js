/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying;
var maxScore;

initGame();

//document.querySelector("#current-" + activePlayer).textContent = dice;
// document.querySelector("#score-" + activePlayer).innerHTML =
//   "<i>" + dice + "</i>";

//var x = document.querySelector("#current-" + activePlayer).innerHTML;

document.querySelector(".btn-roll").addEventListener("click", function () {
  if (gamePlaying) {
    //1. Random number
    var dice1 = Math.floor(Math.random() * 6) + 1;

    var dice2 = Math.floor(Math.random() * 6) + 1;
    // Show the dice
    var diceDOM1 = document.querySelector(".dice-0");
    diceDOM1.style.display = "block";
    diceDOM1.src = "dice-" + dice1 + ".png";

    var diceDOM2 = document.querySelector(".dice-1");
    diceDOM2.style.display = "block";
    diceDOM2.src = "dice-" + dice2 + ".png";

    sumScore = dice1 + dice2;
    //Update the round score if the rolled number was not 1
    if (sumScore === 12) {
      scores[activePlayer] = 0;
      //Update UI
      document.getElementById("score-" + activePlayer).textContent =
        scores[activePlayer];
      nextPlayer();
    } else if (sumScore !== 2) {
      addScore(sumScore);
    } else {
      // Next player
      nextPlayer();
    }
  }
});

document.querySelector(".btn-hold").addEventListener("click", function () {
  if (gamePlaying) {
    // Update the player's score
    scores[activePlayer] += roundScore;

    // Update UI
    document.getElementById("score-" + activePlayer).textContent =
      scores[activePlayer];
    //get MaxScore to check win game
    maxScore = document.getElementById("input-score").value;
    // check if player win the game
    if (scores[activePlayer] >= maxScore) {
      document.getElementById("name-" + activePlayer).textContent = " Winner!";
      document.querySelector(".dice-0").style.display = "none";
      document.querySelector(".dice-1").style.display = "none";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      gamePlaying = !gamePlaying;
    } else {
      // next player
      nextPlayer();
    }
  }
});

document.querySelector(".btn-new").addEventListener("click", function () {
  initGame();
});

function initGame() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;

  gamePlaying = true;
  document.querySelector(".dice-0").style.display = "none";
  document.querySelector(".dice-1").style.display = "none";
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");

  document.querySelector(".player-0-panel").classList.add("active");
}

function addScore(dice) {
  roundScore += dice;
  document.querySelector("#current-" + activePlayer).textContent = roundScore;
}

function nextPlayer() {
  activePlayer = activePlayer === 1 ? 0 : 1;
  roundScore = 0;
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  document.querySelector(".dice-0").style.display = "none";
  document.querySelector(".dice-1").style.display = "none";
}
