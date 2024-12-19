import { films } from './data.js';

// Variables for game state
let currentFilms = [...films];
let currentFilm = null;
let remainingGuesses = 3;

// DOM Elements
const guessForm = document.getElementById('guess-form');
const guessInput = document.getElementById('guess-input');
const submitButton = guessForm.querySelector('button');
const messageContainer = document.querySelector('.message-container');
const emojiCluesContainer = document.querySelector('.emoji-clues-container');

// Utility: Randomly pick a film and remove it from the array
function getRandomFilm() {
    if (currentFilms.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * currentFilms.length);
    return currentFilms.splice(randomIndex, 1)[0];
}   

// Display the emoji clues
function displayEmojiClues(film) {
    emojiCluesContainer.innerHTML = ''; // Clear existing emojis
    film.emoji.forEach((emoji) => {
        const span = document.createElement('span');
        span.textContent = emoji;
        emojiCluesContainer.appendChild(span);
    });
}

// Display a message
function displayMessage(message) {
    messageContainer.textContent = message;
}

// Reset for the next round
function resetGame() {
    if (currentFilms.length === 0) {
        displayMessage("That's all folks!");
        guessInput.disabled = true;
        submitButton.disabled = true;
        return;
    }

    remainingGuesses = 3;
    currentFilm = getRandomFilm();
    displayEmojiClues(currentFilm);
    displayMessage('You have 3 guesses remaining.');
    guessInput.value = '';
    guessInput.disabled = false;
    submitButton.disabled = false;
}

// Check the player's guess
function checkGuess(event) {
    event.preventDefault(); // Prevent form submission
    const guess = guessInput.value.trim().toLowerCase();
    const correctAnswer = currentFilm.title.toLowerCase();

    if (guess === correctAnswer || correctAnswer.includes(guess)) {
        displayMessage('Correct!');
        disableInput();
        setTimeout(resetGame, 3000); // Wait 3 seconds before showing the next film
    } else {
        remainingGuesses -= 1;
        if (remainingGuesses > 0) {
            displayMessage(`Incorrect! You have ${remainingGuesses} more guesses remaining.`);
        } else {
            displayMessage(`The film was "${currentFilm.title}"!`);
            disableInput();
            setTimeout(resetGame, 3000); // Wait 3 seconds before showing the next film
        }
    }
}

// Disable input and button during pauses
function disableInput() {
    guessInput.disabled = true;
    submitButton.disabled = true;
}

// Event listener for the form
guessForm.addEventListener('submit', checkGuess);

// Start the game
resetGame();
