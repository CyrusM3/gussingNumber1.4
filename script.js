'use strict';

let secretNumber = Math.trunc(Math.random() * 50) + 1;
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnOpenModal = document.querySelector('.btn-modal');
const btnCloseModal = document.querySelector('.close-modal');
const checkoutButton = document.querySelector('.check-button');
const scoreElement = document.querySelector('.score');
const resetGame = document.querySelector('.reset');
const highscoreElement = document.querySelector('.highscore');

let numberOfGuesses = 0;
let score = 50;
let highscore = 0;

scoreElement.textContent = score;

btnOpenModal.addEventListener('click', function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
});

//close modal window
btnCloseModal.addEventListener('click', function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
});

//close the modal when we click on overlay(outside modal window)
overlay.addEventListener('click', function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
});

//handling an "Esc" keypress event

document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    if (!modal.classList.contains('hidden')) {
      modal.classList.add('hidden');
      overlay.classList.add('hidden');
    }
  }
});

const displayNumberOfGuesses = function (guessMessage) {
  document.getElementById('guessMessage').textContent = guessMessage;
};

const displayMessage = function (message, color) {
  document.querySelector('.message').textContent = message;
  document.querySelector('.message').style.color = color;
};

let guessNumber = function (color, borderColor, number) {
  document.querySelector('.guess-number').style.color = color;
  document.querySelector('.guess-number').style.borderColor = borderColor;
  document.querySelector('.guess-number').textContent = number;
};

let circle = function (backImg, backColor, transition, transform) {
  document.querySelector('.circle').style.backgroundImage = backImg;
  document.querySelector('.circle').style.backgroundColor = backColor;
  document.querySelector('.circle').style.transition = transition;
  document.querySelector('.circle').style.transform = transform;
};

const checkGuessNumber = function () {
  checkoutButton.addEventListener('click', function () {
    let userGuess = +document.querySelector('.guess').value;
    userGuess.value;

    if (!userGuess) {
      displayMessage(`⛔No number!`, 'red');
    }

    if (userGuess < 1 || userGuess > 50) {
      alert('Please enter a number between 1 and 50');
    }
    //IF USER GUESSES THE NUMBER
    else if (userGuess === secretNumber) {
      document.getElementById('victory').play();
      if (score > highscore) {
        highscore = score;
        highscoreElement.textContent = highscore;
      }

      circle(
        'conic-gradient(#98c854 360deg, transparent 360deg)',
        '_',
        '2s',
        'rotate(360deg)'
      );

      numberOfGuesses = numberOfGuesses + 1;
      guessNumber('#98c854', '#98c854', userGuess);
      displayMessage(`You Guessed It 😉`, '#98c854');
      displayNumberOfGuesses(`Number Of Guesses:${numberOfGuesses}`);

      checkoutButton.disabled = true;
      checkoutButton.classList.add('hover');
      document.querySelector('.guess').style.opacity = '0';

      //WHEN GUESS IS WRONG
    } else if (userGuess !== secretNumber) {
      if (score > 1) {
        // document.getElementById('wrong').play();
        score = score - 1;
        scoreElement.textContent = score;
        numberOfGuesses = numberOfGuesses + 1;
        userGuess > secretNumber
          ? displayMessage(`📈Too High!`, '#FF4500')
          : displayMessage(`📉Too Low!`, '#87CEFA');
        displayNumberOfGuesses(`Number Of Guesses:${numberOfGuesses}`);
      } else {
        scoreElement.textContent = 0;
        checkoutButton.disabled = true;
        displayMessage(`💥💥 You lost the game`, '#e5b50a');
      }
    }
  });
};

checkGuessNumber();

const reset = function () {
  resetGame.addEventListener('click', function () {
    score = 50;
    numberOfGuesses = 0;
    secretNumber = Math.trunc(Math.random() * 50) + 1;
    scoreElement.textContent = score;
    checkoutButton.disabled = false;
    checkoutButton.classList.remove('hover');
    document.querySelector('.guess').value = ``;
    document.querySelector('.guess').style.transition = '3s';
    document.querySelector('.guess').style.opacity = '1';
    document.getElementById('victory').pause();
    document.getElementById('reset').play();
    guessNumber('#fff', '#fff', '?');
    displayMessage(`Can You Guess?!`, '#fff');
    displayNumberOfGuesses(`Number Of Guesses:${numberOfGuesses}`);
    circle('initial', '#101010', '0', 'rotate(0)');
  });
};

reset();
