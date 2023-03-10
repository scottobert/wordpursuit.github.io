// Set up game variables
var secretWord;
var letters;
var numGuesses;
var numCorrect;
var numIncorrect;
var correctGuesses;

document.addEventListener("DOMContentLoaded", function () {
    // Initialize game
    newGame();
});

// Event listener for submit button
document.getElementById("submit-button").addEventListener("click", function () {
    var guess = document.getElementById("guess-input").value.toUpperCase();

    // Check if guess is valid
    if (!guess || guess.length > 1 || !guess.match(/[A-Z]/)) {
        document.getElementById("result").innerHTML = '<span class="invalid">Invalid guess. Please enter a single letter from A to Z.</span>';
        return;
    }

    // Check if guess has already been made
    if (!letters.includes(guess)) {
        document.getElementById("result").innerHTML = '<span class="invalid">You already guessed that letter.</span>';
        return;
    }

    // Check if guess is correct
    var thisGuess = checkGuess(guess);
    if (correctGuesses.length > 0) {
        numCorrect += correctGuesses.length;
        document.getElementById("result").innerHTML = '<span class="correct">Correct! The letter ' + guess + ' is in position(s) ' + thisGuess.join(", ") + '.</span>';
    } else {
        numIncorrect++;
        document.getElementById("result").innerHTML = '<span class="incorrect">Incorrect. The letter ' + guess + ' is not in the secret word.</span>';
    }

    // Update game state
    letters.splice(letters.indexOf(guess), 1);
    document.getElementById("available-letters").innerHTML = 'Available letters: ' + letters.join(", ");
    numGuesses++;
    updateSecretWord(correctGuesses);

    // Check if game is over
    if (numCorrect === secretWord.length) {
        document.getElementById("result").innerHTML = '<span class="correct">Congratulations, you guessed the secret word "' + secretWord.join("") + '" in ' + numGuesses + ' tries!</span>';
        document.getElementById("guess-input").disabled = true;
        document.getElementById("submit-button").disabled = true;
    } else if (numIncorrect >= 6) {
        document.getElementById("result").innerHTML = '<span class="incorrect">Game over. You ran out of guesses. The secret word was "' + secretWord.join("") + '".</span>';
        document.getElementById("guess-input").disabled = true;
        document.getElementById("submit-button").disabled = true;
    }
});

// Function to start a new game
function newGame() {
    console.log('new game');
    // Choose a random secret word
    var words = ["JAZZ", "FROG", "QUIZ", "BUZZ", "HYPE", "GLOW", "JUMP", "FLUX", "MATH", "KICK"];
    secretWord = words[Math.floor(Math.random() * words.length)].split("");

    // Initialize game state
    letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    numGuesses = 0;
    numCorrect = 0;
    numIncorrect = 0;
    correctGuesses = [];

    // Display game elements
    updateSecretWord(correctGuesses);
    document.getElementById("available-letters").innerHTML = 'Available letters: ' + letters.join(", ");
    document.getElementById("guess-input").value = "";
    document.getElementById("guess-input").disabled = false;
    document.getElementById("submit-button").disabled = false;
    document.getElementById("result").innerHTML = "";
}

// Function to check a guess and return positions of correct letters
function checkGuess(guess) {
    var thisGuess = [];
    for (var i = 0; i < secretWord.length; i++) {
        if (secretWord[i] === guess) {
            thisGuess.push(i);
            correctGuesses.push(i);
        }
    }
    return thisGuess;
}

// Function to update the display of the secret word
function updateSecretWord(positions) {
    var displayWord = "";
    for (var i = 0; i < secretWord.length; i++) {
        if (positions.includes(i)) {
            displayWord += '<span class="correct">' + secretWord[i] + '</span> ';
        } else {
            displayWord += '_ ';
        }
    }
    document.getElementById("secret-word").innerHTML = displayWord.trim();
}
