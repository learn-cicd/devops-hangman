# Bug Tracker

## Known Bugs

### 1. Word Bank Edit Bug
- **Status**: Open
- **Date Found**: February 11, 2026
- **Description**: Editing a word from the word bank deletes it instead of updating it
- **Steps to Reproduce**:
  1. Open word bank
  2. Attempt to edit an existing word
  3. Word gets deleted instead of being updated
- **Expected Behavior**: Word should be updated with new value
- **Actual Behavior**: Word is removed from the word bank
- **Priority**: High
- **Assigned To**: 
- **Notes**: 


## 2. Empty Word Validation Bug
- **Status**: Open  
- **Date Found**: February 11, 2026  
- **Description**: The system allows empty words to be added to the word bank.  
- **Steps to Reproduce**:
  1. Open word bank  
  2. Leave the input field empty  
  3. Click add/save  
- **Expected Behavior**: The system should reject empty input and display a validation message.  
- **Actual Behavior**: An empty word is added to the word bank.  
- **Priority**: High  
- **Assigned To**:  
- **Notes**: May cause gameplay errors  


## 3. Duplicate Word Allowed Bug
- **Status**: Open  
- **Date Found**: February 11, 2026  
- **Description**: The system allows duplicate words to be added to the word bank.  
- **Steps to Reproduce**:
  1. Add a word (e.g., HELLO)  
  2. Add the same word again  
- **Expected Behavior**: The system should prevent duplicate entries and display an error message.  
- **Actual Behavior**: The same word is added multiple times to the word bank.  
- **Priority**: Medium  
- **Assigned To**:  
- **Notes**: Causes redundant entries and reduces data integrity.  


## 4. Numbers and Special Characters Validation Bug
- **Status**: Open  
- **Date Found**: February 11, 2026  
- **Description**: The system allows words containing numbers and special characters, violating the requirement that words must contain only uppercase letters (A–Z).  
- **Steps to Reproduce**:
  1. Open word bank  
  2. Enter a word such as HELLO123  
  3. Enter a word such as TEST!  
  4. Click add/save  
- **Expected Behavior**: The system should reject words containing numbers or special characters.  
- **Actual Behavior**: Words containing invalid characters are accepted.  
- **Priority**: High  
- **Assigned To**:  
- **Notes**: Violates input validation rule defined in REQUIREMENTS.md.

## 5. Word Bank Delete Function Not Working
- **Status**: Open  
- **Date Found**: February 11, 2026  
- **Description**: The system does not allow users to delete words from the word bank, violating the requirement that users must be able to remove words.  
- **Steps to Reproduce**:
  1. Open word bank  
  2. Attempt to delete an existing word  
  3. Observe system response  
- **Expected Behavior**: The selected word should be removed from the word bank.  
- **Actual Behavior**: The word remains in the word bank and is not deleted.  
- **Priority**: High  
- **Assigned To**:  
- **Notes**: Violates word bank management requirement and affects user control over stored words.  

### Player Setup Bugs

#### 1. Player Name Validation Missing
- **Status**: Fixed
- **Date Found**: February 11, 2026
- **Date Fixed**: February 11, 2026
- **Description**: The "Start Game" button does not validate player names. Players can start the game with empty names (defaulting to "Player 1" and "Player 2") or with identical names, making it impossible to distinguish between players.
- **Steps to Reproduce**:
  1. Leave player name fields empty OR enter the same name for both players
  2. Click "Start Game"
  3. Game starts without validation
- **Expected Behavior**: 
  - Player names MUST NOT be empty (per REQ-PS-01)
  - Player 1 and Player 2 MUST have different names (per REQ-PS-01)
  - The "Start Game" button MUST validate player names (per REQ-PS-02)
  - Error messages should be displayed for invalid input
- **Actual Behavior**: Game starts with default names or identical names without validation
- **Priority**: High
- **Requirements Violated**: REQ-PS-01 (Player names MUST NOT be empty, players MUST have different names), REQ-PS-02 (The "Start Game" button MUST validate player names)
- **Assigned To**: 
- **Notes**: Fixed by implementing full validation logic in startGame() function that checks for empty names and duplicate names with appropriate error messages

---

### Game Flow Bugs

#### 1. Player Turn Does Not Change After Win
- **Status**: Fixed
- **Date Found**: February 11, 2026
- **Date Fixed**: February 11, 2026
- **Description**: When a player wins a round, the turn does not switch to the other player. The same player continues playing in the next round.
- **Steps to Reproduce**:
  1. Start a game with two players
  2. Complete a round where Player 1 wins
  3. Click "Next Round"
  4. Observe that Player 1 plays again instead of Player 2
- **Expected Behavior**: Players MUST switch turns after a win (per REQ-WL-01). The next player MUST be the one who didn't play the previous round (per REQ-WL-04)
- **Actual Behavior**: The same player continues playing after winning
- **Priority**: High
- **Requirements Violated**: REQ-WL-01 (Players MUST switch turns after a win), REQ-WL-04 (The next player MUST be the one who didn't play the previous round)
- **Assigned To**: 
- **Notes**: Fixed by adding player turn switching logic to gameWon() function to match gameLost() behavior

#### 2. Lives Not Resetting Between Rounds
- **Status**: Fixed
- **Date Found**: February 11, 2026
- **Date Fixed**: February 11, 2026
- **Description**: Lives counter calculation is incorrect and does not properly reset to 6 at the start of each round
- **Steps to Reproduce**:
  1. Start a new round
  2. Check the lives display
  3. Make wrong guesses
  4. Start next round
  5. Observe lives counter behavior
- **Expected Behavior**: Lives MUST reset to 6 at the start of each round (per REQ-GF-01). Lives MUST start at 6 (per REQ-GM-04)
- **Actual Behavior**: Lives calculation in updateLives() function (line 222) is incorrect: `livesLeft = maxWrong - wrongGuesses + 1` results in 7 lives initially instead of 6
- **Priority**: High
- **Requirements Violated**: REQ-GF-01 (Lives MUST reset to 6), REQ-GM-04 (Lives MUST start at 6)
- **Assigned To**: 
- **Notes**: Fixed by removing the +1 from the formula. Changed to `livesLeft = maxWrong - wrongGuesses` which correctly gives 6 lives at start (6 - 0 = 6)

---

### Gameplay Mechanics Bugs

#### 1. No Visual Indication for Already-Used Letters
- **Status**: Open
- **Date Found**: February 11, 2026
- **Description**: When a player clicks a letter that has already been guessed, there is no visual feedback or indication to inform them that the letter was already used
- **Steps to Reproduce**:
  1. Start a game
  2. Click a letter (e.g., "A")
  3. Try clicking the same letter again
  4. Button does nothing but provides no visual indication it was already used
- **Expected Behavior**: Each letter MUST only be clickable once per round (per REQ-GM-01). Clicking a letter MUST disable that button (per REQ-GM-01)
- **Actual Behavior**: Button is not disabled after clicking, providing no visual feedback that it has already been used
- **Priority**: Medium
- **Requirements Violated**: REQ-GM-01 (Clicking a letter MUST disable that button)
- **Assigned To**: 
- **Notes**: guessLetter() function checks if letter was used (line 176) but doesn't disable the button; need to add button.disabled = true after clicking

#### 2. Incorrect Hangman Parts Display Order
- **Status**: Fixed
- **Date Found**: February 11, 2026
- **Date Fixed**: February 11, 2026
- **Description**: Hangman parts appear in the wrong order. Currently displays: head → left arm → right arm → body → left leg → right leg
- **Steps to Reproduce**:
  1. Start a game
  2. Make wrong guesses
  3. Observe the order of hangman parts appearing
- **Expected Behavior**: Parts MUST appear in this order: head, body, left arm, right arm, left leg, right leg (per REQ-GM-05)
- **Actual Behavior**: Parts appear in order: head, left arm, right arm, body, left leg, right leg
- **Priority**: High
- **Requirements Violated**: REQ-GM-05 (Parts MUST appear in this order: head, body, left arm, right arm, left leg, right leg)
- **Assigned To**: 
- **Notes**: Fixed by removing the wrongOrder array and using the correct parts array in updateHangman() function
- **Date Found**: February 11, 2026
- **Description**: Hangman parts appear in the wrong order. Currently displays: head → left arm → right arm → body → left leg → right leg
- **Steps to Reproduce**:
  1. Start a game
  2. Make wrong guesses
  3. Observe the order of hangman parts appearing
- **Expected Behavior**: Parts MUST appear in this order: head, body, left arm, right arm, left leg, right leg (per REQ-GM-05)
- **Actual Behavior**: Parts appear in order: head, left arm, right arm, body, left leg, right leg
- **Priority**: High
- **Requirements Violated**: REQ-GM-05 (Parts MUST appear in this order: head, body, left arm, right arm, left leg, right leg)
- **Assigned To**: 
- **Notes**: updateHangman() function at line 229 uses wrongOrder array with incorrect sequence; should use the parts array instead which has the correct order

---