const defaultWords = [
    'DEVOPS', 'AGILE', 'VERSION', 'BRANCH', 'GITHUB', 
    'CHANGES', 'FEATURES', 'HOTFIX', 'CONTINUOUS', 'INTEGRATION',
    'DEPLOYMENT', 'TESTING', 'COMMIT', 'SNAPSHOT', 'CULTURE',
    'PIPELINE', 'DOCKER', 'SCRUM', 'KANBAN', 'MERGE'
];

let gameState = {
    player1: { name: '', score: 0 },
    player2: { name: '', score: 0 },
    currentPlayer: 1,
    currentWord: '',
    guessedLetters: [],
    wrongGuesses: 0,
    maxWrong: 6,
    gameActive: false,
    usedWords: []
};

let wordBank = [];

document.addEventListener('DOMContentLoaded', function() {
    loadWordBank();
    generateKeyboard();
});

// Load words from localStorage or default
function loadWordBank() {
    const stored = localStorage.getItem('devopsWords');
    if (stored) {
        wordBank = JSON.parse(stored);
    } else {
        wordBank = [...defaultWords];
        saveWordBank();
    }
    displayWordBank();
}

// Save wordBank to localStorage
function saveWordBank() {
    localStorage.setItem('devopsWords', JSON.stringify(wordBank));
}

// Display the word bank
function displayWordBank() {
    const wordList = document.getElementById('wordList');
    const wordCount = document.getElementById('wordCount');
    
    wordCount.textContent = wordBank.length;
    
    if (wordBank.length === 0) {
        wordList.innerHTML = `
            <div class="empty-state">
                <h3>No words in the bank!</h3>
                <p>Add some DevOps terms to get started.</p>
            </div>
        `;
        return;
    }
    
    wordList.innerHTML = '';
    wordBank.forEach((word, index) => {
        const wordItem = document.createElement('div');
        wordItem.className = 'word-item';
        wordItem.innerHTML = `
            <span class="word">${word}</span>
            <div class="actions">
                <button class="edit-btn" onclick="editWord(${index})">Edit</button>
                <button class="delete-btn" onclick="deleteWord(${index})">Delete</button>
            </div>
        `;
        wordList.appendChild(wordItem);
    });
}

// ADD WORD: validate, reject duplicates, invalid chars
function addWord() {
    const input = document.getElementById('newWord');
    const word = input.value.trim().toUpperCase();
    
    if (!word) {
        alert('Cannot add empty word!');
        return;
    }
    if (wordBank.includes(word)) {
        alert('Word already exists!');
        return;
    }
    if (/[^A-Z]/.test(word)) {
        alert('Word can only contain letters A-Z!');
        return;
    }
    
    wordBank.push(word);
    input.value = '';
    saveWordBank();
    displayWordBank();
}

// EDIT WORD: validate, prevent duplicates, valid letters only
function editWord(index) {
    const newWord = prompt('Edit word:', wordBank[index]);
    if (!newWord) return;
    
    const word = newWord.trim().toUpperCase();
    
    if (!word) {
        alert('Cannot set empty word!');
        return;
    }
    if (wordBank.includes(word) && word !== wordBank[index]) {
        alert('Word already exists!');
        return;
    }
    if (/[^A-Z]/.test(word)) {
        alert('Word can only contain letters A-Z!');
        return;
    }
    
    wordBank[index] = word;
    saveWordBank();
    displayWordBank();
}

// DELETE WORD: confirm deletion, update localStorage
function deleteWord(index) {
    if (confirm('Are you sure you want to delete this word?')) {
        wordBank.splice(index, 1);
        saveWordBank();
        displayWordBank();
    }
}

// GENERATE KEYBOARD
function generateKeyboard() {
    const keyboard = document.getElementById('keyboard');
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    
    keyboard.innerHTML = '';
    for (let letter of letters) {
        const button = document.createElement('button');
        button.className = 'key';
        button.textContent = letter;
        button.onclick = () => guessLetter(letter);
        button.id = 'key-' + letter;
        keyboard.appendChild(button);
    }
}

// START GAME
function startGame() {
    const p1Name = document.getElementById('player1Name').value.trim();
    const p2Name = document.getElementById('player2Name').value.trim();
    
    gameState.player1.name = p1Name || 'Player 1';
    gameState.player2.name = p2Name || 'Player 2';
    
    document.getElementById('player1Display').textContent = gameState.player1.name;
    document.getElementById('player2Display').textContent = gameState.player2.name;
    
    document.getElementById('gameArea').style.display = 'block';
    
    nextRound();
}

// NEXT ROUND: alternate players, pick random word
function nextRound() {
    if (wordBank.length === 0) {
        alert('No words in the word bank! Add some words first.');
        return;
    }

    gameState.guessedLetters = [];
    gameState.wrongGuesses = 0;
    gameState.gameActive = true;

    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * wordBank.length);
    } while (wordBank[randomIndex] === gameState.currentWord && wordBank.length > 1);

    gameState.currentWord = wordBank[randomIndex];

    document.getElementById('gameStatus').className = 'game-status';
    resetHangman();
    resetKeyboard();
    updateWordDisplay();
    updateWrongLetters();
    updateLives();

    gameState.currentPlayer = gameState.currentPlayer === 1 ? 2 : 1;
    updateCurrentPlayer();
}

// GUESS LETTER
function guessLetter(letter) {
    if (!gameState.gameActive) return;
    
    if (gameState.guessedLetters.includes(letter)) return;
    
    gameState.guessedLetters.push(letter);
    
    if (!gameState.currentWord.includes(letter)) {
        gameState.wrongGuesses++;
        updateHangman();
    }
    
    updateWordDisplay();
    updateWrongLetters();
    updateLives();
    checkGameStatus();
}

// UPDATE DISPLAY
function updateWordDisplay() {
    const display = document.getElementById('wordDisplay');
    display.textContent = [...gameState.currentWord].map(l => gameState.guessedLetters.includes(l) ? l : '_').join(' ');
}

function updateWrongLetters() {
    const wrongLettersDiv = document.getElementById('wrongLetters');
    const wrong = gameState.guessedLetters.filter(l => !gameState.currentWord.includes(l));
    wrongLettersDiv.textContent = wrong.length ? wrong.join(', ') : 'None yet';
}

function updateLives() {
    const livesLeft = gameState.maxWrong - gameState.wrongGuesses;
    document.getElementById('livesLeft').textContent = livesLeft;
}

// HANGMAN
function updateHangman() {
    const wrongOrder = ['head', 'leftArm', 'rightArm', 'body', 'leftLeg', 'rightLeg'];
    const partIndex = gameState.wrongGuesses - 1;
    if (partIndex >= 0 && partIndex < wrongOrder.length) {
        document.getElementById(wrongOrder[partIndex]).style.display = 'block';
    }
}

function resetHangman() {
    ['head','body','leftArm','rightArm','leftLeg','rightLeg'].forEach(id => {
        document.getElementById(id).style.display = 'none';
    });
}

function resetKeyboard() {
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(letter => {
        const btn = document.getElementById('key-' + letter);
        if (btn) btn.disabled = false;
    });
}

// PLAYER DISPLAY
function updateCurrentPlayer() {
    const p1Div = document.getElementById('player1Score');
    const p2Div = document.getElementById('player2Score');
    
    p1Div.classList.toggle('active', gameState.currentPlayer === 1);
    p2Div.classList.toggle('active', gameState.currentPlayer === 2);
}

// GAME STATUS
function checkGameStatus() {
    const allGuessed = [...gameState.currentWord].every(l => gameState.guessedLetters.includes(l));
    
    if (allGuessed) gameWon();
    else if (gameState.wrongGuesses >= gameState.maxWrong) gameLost();
}

function gameWon() {
    gameState.gameActive = false;
    const winner = gameState.currentPlayer === 1 ? gameState.player2 : gameState.player1;
    winner.score += 10;
    document.getElementById('score1').textContent = gameState.player1.score;
    document.getElementById('score2').textContent = gameState.player2.score;
    
    const winnerName = winner.name;
    const statusDiv = document.getElementById('gameStatus');
    document.getElementById('statusMessage').textContent = `🎉 ${winnerName} won! The word was: ${gameState.currentWord}`;
    statusDiv.classList.add('show', 'winner');
}

function gameLost() {
    gameState.gameActive = false;
    const currentPlayerName = gameState.currentPlayer === 1 ? gameState.player1.name : gameState.player2.name;
    
    const statusDiv = document.getElementById('gameStatus');
    document.getElementById('statusMessage').textContent = `😢 ${currentPlayerName} lost! The word was: ${gameState.currentWord}`;
    statusDiv.classList.add('show', 'loser');
    
    gameState.currentPlayer = gameState.currentPlayer === 1 ? 2 : 1;
    updateCurrentPlayer();
}
