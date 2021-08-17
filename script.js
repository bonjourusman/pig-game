'use strict';

// Selecting Elements:
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
// const score0 = document.getElementById('score--0'); // Alternate Method (does not require '#' prefix)
const score1El = document.querySelector('#score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

// Initialization Function:
const init = function () {
  scores = [0, 0]; // final accumalated score array for both players
  currentScore = 0;
  activePlayer = 0;
  playing = true; // Define a state variable to record game status

  // Reset Visual Elements
  diceEl.classList.add('hidden'); // Hide Initial Dice by creating Hidden Class at the end of the CSS style sheet and add it to the dice element here

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');

  score0El.textContent = 0; // JavaScript will convert this to a string automatically
  score1El.textContent = 0; // JavaScript will convert this to a string automatically
  current0El.textContent = 0;
  current1El.textContent = 0;
};

init();

const switchPlayer = function () {
  // No parameters (arguments) needed for this function
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer == 0 ? 1 : 0;
  player0El.classList.toggle('player--active'); // toggle ADDS when string is not present, and REMOVES when string is present.
  player1El.classList.toggle('player--active');
};

// Rolling Dice Functionality:

btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a Random Dice Roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // console.log(dice);

    // 2. Display Dice
    diceEl.classList.remove('hidden');
    diceEl.src = `./img/dice-${dice}.png`; // dynamically load one of the 6 images in the project folder
    console.log(diceEl.src);

    // 3. Check for rolled 1: if TRUE, switch to next player
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

// Hold Button Event

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to the final score of Active Player
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if score is at least 100
    // if TRUE, finish the game
    if (scores[activePlayer] >= 20) {
      // Finish the game
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      // Hide the dice
      diceEl.classList.add('hidden');
    }
    // if FALSE, switch to the next player
    else {
      // Switch to next player
      switchPlayer();
    }
  }
});

// RESET the game
btnNew.addEventListener('click', init);
