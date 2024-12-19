// The keyboard has been rendered for you
import { renderKeyboard } from '/keyboard'
document.getElementById('keyboard-container').addEventListener('click', checkGuess)

// Some useful elements
const guessContainer = document.getElementById('guess-container')
const snowmanParts = document.getElementsByClassName('snowman-part')

/*
Challenge  
1. Your challenge is to build a Christmas take on the classic game "Hangman" where a player attempts to guess a word by selecting letters to save a snowman from melting.
- The snowman is made up of 6 parts: hat, arm, nose, scarf, head, and body. These are separate images and have been positioned with CSS.
- At the start of the game, a player can see a number of dashes, with a dash for each letter of the word. So if the word was TREE the player would see - - - -
- The player selects a letter. 
- If that letter is in the word, that letter replaces the dash in the corresponding position. For the word "TREE", if the player has selected the letter E, they will see --EE.
- If the selected letter does not appear in the word, one part of the snowman gets removed.
- If the player guesses the entire word, they win! 
    - any removed parts of the snowman are reinstated.
    - the snowman gets sunglasses
    - the message "You Win!" is displayed in the "guess-container" div.
-If the player guesses wrong 6 times: 
    - only a puddle remains.
    - the message "You Lose!" is displayed in the "guess-container" div.
    
*** Stretch Goals *** 

- Disable the letter button once a letter has been used.
- Add a "New Game" button that appears at the end of a game and resets the app. (You will need to create an array of words to guess)
*/

// Set the word to guess
const word = "gift"
// 6 guesses for the 6 parts of the snowman
let guesses = 6


const words = ['gift', 'tree', 'snow', 'bells', 'sleigh', 'lights']; // Word pool for new games

// Initialize game state
function start() {
    guessArr = Array(word.length).fill('-');
    guesses = 6;

    // Reset snowman visibility
    for (let part of snowmanParts) {
        part.style.visibility = 'visible';
    }
    sunglasses.style.visibility = 'hidden';
    puddle.style.visibility = 'hidden';

    // Reset UI
    renderGuess();
    document.querySelectorAll('.letter').forEach(button => {
        button.disabled = false;
    });
}

// Render current guess state
function renderGuess() {
    const guessHtml = guessArr.map(
        (char) => `<div class="guess-char">${char}</div>`
    );
    guessContainer.innerHTML = guessHtml.join(''); // Add dashes/letters to the DOM
}
// Handle letter click
function checkGuess(event) {
    const target = event.target;
    if (!target.classList.contains('letter') || target.disabled) return;

    const letter = target.id;
    target.disabled = true; // Disable used letter
    processGuess(letter);
}

// Process guessed letter
function processGuess(letter) {
    if (word.includes(letter)) {
        // Correct guess
        updateGuess(letter);
        renderGuess();

        if (guessArr.join('') === word) {
            gameWin();
        }
    } else {
        // Wrong guess
        guesses--;
        if (guesses >= 0) {
            snowmanParts[guesses].style.visibility = 'hidden';
        }

        if (guesses === 0) {
            gameLose();
        }
    }
}

// Update guessed letters in the display array
function updateGuess(letter) {
    for (let i = 0; i < word.length; i++) {
        if (word[i] === letter) {
            guessArr[i] = letter; // Replace dash with correct letter
        }
    }
}

// Handle win scenario
function gameLose() {
    // Hide remaining snowman parts and show puddle
    for (let part of snowmanParts) {
        part.style.visibility = 'hidden';
    }
    puddle.style.visibility = 'visible';

    // Display "You Lose" message
    guessContainer.innerHTML = '<div class="message">💧 You Lose! 💧</div>';
    showNewGameButton();
}

// Handle lose scenario
function gameWin() {
    // Reinstate all snowman parts
    for (let part of snowmanParts) {
        part.style.visibility = 'visible';
    }

    // Show sunglasses
    sunglasses.style.visibility = 'visible';

    // Display "You Win" message
    guessContainer.innerHTML = '<div class="message">🎉 You Win! 🎉</div>';
    showNewGameButton();
}
// Display "New Game" button
function showNewGameButton() {
    const newGameButton = document.createElement('button');
    newGameButton.textContent = 'New Game';
    newGameButton.classList.add('new-game');
    newGameButton.onclick = () => {
        word = words[Math.floor(Math.random() * words.length)];
        start();
        newGameButton.remove();
    };
    guessContainer.appendChild(newGameButton);
}

renderKeyboard();
start();
