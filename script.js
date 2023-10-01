'use strict';
let player; // p0,p1
const totalScorePlayer0 = document.getElementById('score--0');
const totalScorePlayer1 = document.getElementById('score--1');
const currentScorePlayer0 = document.getElementById('current--0');
const currentScorePlayer1 = document.getElementById('current--1');
const playerActive = document.querySelectorAll('.player');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const winbox = document.querySelector('.winbox');
const playerWinEl = document.querySelector('.player--win');
let score;
let getCurrentScoreP0 = Number(currentScorePlayer0.textContent);
let getCurrentScoreP1 = Number(currentScorePlayer1.textContent);
let tScore0 = Number(totalScorePlayer0.textContent);
let tScore1 = Number(totalScorePlayer1.textContent);
let isPlayerWin;

const resetGame = function () {
  console.log('Start game');
  btnNew.textContent = '🔄 Reset game';
  totalScorePlayer0.textContent = '0';
  totalScorePlayer1.textContent = '0';
  diceEl.classList.add('hidden');
  currentScorePlayer0.textContent = '0';
  currentScorePlayer1.textContent = '0';
  winbox.classList.add('hidden');
  btnRoll.classList.remove('hidden');
  btnHold.classList.remove('hidden');
  tScore0 = 0;
  tScore1 = 0;
  isPlayerWin = false;
  score = 0;
  switchPlayer(0);
};

const resetCurr = function () {
  currentScorePlayer0.textContent = 0;
  currentScorePlayer1.textContent = 0;
  getCurrentScoreP0 = 0;
  getCurrentScoreP1 = 0;
  score = 0;
};

const playGame = function () {
  //Random Dice
  const diceRoll = Math.trunc(Math.random() * 6) + 1;
  diceRoll == 1
    ? console.log('Score equal 1, discard all current score')
    : console.log(diceRoll);

  //Display Dice
  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${diceRoll}.png`;

  //Update to current score
  if (player === 0) {
    score = getCurrentScoreP0 += diceRoll;
    if (diceRoll === 1) {
      score = 0;
      player = 1;
      switchPlayer(player);
    }
    currentScorePlayer0.textContent = score;
  } else {
    score = getCurrentScoreP1 += diceRoll;
    if (diceRoll === 1) {
      score = 0;
      player = 0;
      switchPlayer(player);
    }
    currentScorePlayer1.textContent = score;
  }
};

const switchPlayer = function (playNum) {
  playNum === 0 ? (player = playNum) : (player = playNum);
  for (let i = 0; i < playerActive.length; i++) {
    i === playNum
      ? playerActive[i].classList.add('player--active')
      : playerActive[i].classList.remove('player--active');
  }
  resetCurr();
};

let winCheck = function (score, player) {
  player += 1;
  if (score >= 100) {
    score = 100;
    winbox.classList.remove('hidden');
    btnRoll.classList.add('hidden');
    btnHold.classList.add('hidden');
    playerWinEl.textContent = `👑Player ${player} win the game 🎉🎊`;
    console.log(`${player} is win the game`);
  }
};

isPlayerWin = false;
winbox.classList.add('hidden');
diceEl.classList.add('hidden');

btnNew.addEventListener('click', resetGame);
btnRoll.addEventListener('click', playGame);
btnHold.addEventListener('click', function () {
  diceEl.classList.add('hidden');
  if (player === 0) {
    tScore0 += getCurrentScoreP0;
    totalScorePlayer0.textContent = tScore0;
    winCheck(tScore0, player);
    switchPlayer(1);
  } else {
    tScore1 += getCurrentScoreP1;
    totalScorePlayer1.textContent = tScore1;
    winCheck(tScore1, player);
    switchPlayer(0);
  }
  console.log(`TScore 0 = ${tScore0}`);
  console.log(`TScore 1 = ${tScore1}`);
});
