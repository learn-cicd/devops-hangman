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

const savedWords = localStorage.getItem('devopsWords');

if (savedWords) {
    wordBank = JSON.parse(savedWords);
} else {
    wordBank = [...defaultWords];
    localStorage.setItem('devopsWords', JSON.stringify(wordBank));
}

document.addEventListener('DOMContentLoaded', function() {
    displayWordBank();
    generateKeyboard();
});

// Toggle theme (moon/sun)
function toggleTheme() {
    const themeIcon = document.querySelector('.theme-icon');
    if (themeIcon.textContent === '🌙') {
        themeIcon.textContent = '☀️';
    } else {
        themeIcon.textContent = '🌙';
    }
}

// Switch tabs in the UI
function switchTab(tabName) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.remove('active'));
    const tabButtons = document.querySelectorAll('.tab');
    tabButtons.forEach(btn => btn.classList.remove('active'));
    document.getElementById(tabName).classList.add('active');
    event.target.classList.add('active');
}

// Load word bank from localStorage
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

// Save word bank to localStorage
function saveWordBank() {
    localStorage.setItem('devopsWords', JSON.stringify(wordBank));
}

// Display word bank in UI
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

// Add a word with validation
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

// Edit a word with validation
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

// Delete a word
function deleteWord(index) {
    if (confirm('Are you sure you want to delete this word?')) {
        wordBank.splice(index, 1);
        saveWordBank();
        displayWordBank();
    }
}

// Generate keyboard
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

// Start the game
function startGame() {
    const p1Name = document.getElementById('player1Name').value.trim();
    const p2Name = document.getElementById('player2Name').value.trim();
    if (!p1Name || !p2Name || p1Name === p2Name) return;
    gameState.player1.name = p1Name;
    gameState.player2.name = p2Name;
    document.getElementById('player1Display').textContent = gameState.player1.name;
    document.getElementById('player2Display').textContent = gameState.player2.name;
    document.getElementById('gameArea').style.display = 'block';
    nextRound();
}

// Next round logic
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
    } while (gameState.usedWords.includes(randomIndex) && gameState.usedWords.length < wordBank.length);

    gameState.currentWord = wordBank[randomIndex];
    gameState.usedWords.push(randomIndex);
    if (gameState.usedWords.length === wordBank.length) gameState.usedWords = [];

    document.getElementById('gameStatus').className = 'game-status';
    resetHangman();
    resetKeyboard();
    updateWordDisplay();
    updateWrongLetters();
    updateLives();

    gameState.currentPlayer = gameState.currentPlayer === 1 ? 2 : 1;
    updateCurrentPlayer();
}

// Guess a letter
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

// Update display
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

function updateCurrentPlayer() {
    const p1Div = document.getElementById('player1Score');
    const p2Div = document.getElementById('player2Score');

    p1Div.classList.toggle('active', gameState.currentPlayer === 1);
    p2Div.classList.toggle('active', gameState.currentPlayer === 2);
}

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

    document.getElementById('statusMessage').textContent = `🎉 ${winner.name} won! The word was: ${gameState.currentWord}`;
    document.getElementById('gameStatus').classList.add('show', 'winner');

    gameState.currentPlayer = gameState.currentPlayer === 1 ? 2 : 1;
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
