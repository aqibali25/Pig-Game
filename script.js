'use strict';

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const winnerLabel = document.querySelector('.winner');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const GetNames = document.querySelector('.GetNames');
const startbtn = document.querySelector('.startbtn');
const getPlayer0Name = document.getElementById('inputName--0');
const getPlayer1Name = document.getElementById('inputName--1');
const player0Name = document.getElementById('name--0');
const player1Name = document.getElementById('name--1');

let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  winnerLabel.textContent = '';
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');

  GetNames.classList.remove('hidden');
  document.querySelector('.overlay').classList.remove('hidden');

  player0Name.textContent = 'PLAYER 1';
  player1Name.textContent = 'PLAYER 1';
  getPlayer0Name.value = '';
  getPlayer1Name.value = '';
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;

    diceEl.classList.remove('hidden');
    diceEl.src = `assets/dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      playing = false;
      //   diceEl.classList.add('hidden');
      diceEl.src = `assets/winner.png`;
      winnerLabel.textContent =
        activePlayer === 0 ? `Player 1 Wins🥇` : `Player 2 Wins🥇`;

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);

startbtn.addEventListener('click', function () {
  GetNames.classList.add('hidden');
  document.querySelector('.overlay').classList.add('hidden');

  if (getPlayer0Name.value.length > 3 && getPlayer1Name.value.length > 3) {
    player0Name.textContent = getPlayer0Name.value;
    player1Name.textContent = getPlayer1Name.value;
  }
});
