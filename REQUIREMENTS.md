# DevOps Hangman - Requirements Specification

## Purpose
This document defines the expected behavior of the DevOps Hangman application. Use these requirements to validate that the application works correctly.

---

## Functional Requirements

### 1. Word Bank Management

**REQ-WB-01: Default Words**
- The application MUST pre-load with 20 DevOps-related words
- Default words include: DEVOPS, AGILE, VERSION, BRANCH, GITHUB, CHANGES, FEATURES, HOTFIX, CONTINUOUS, INTEGRATION, DEPLOYMENT, TESTING, COMMIT, SNAPSHOT, CULTURE, PIPELINE, DOCKER, SCRUM, KANBAN, MERGE

**REQ-WB-02: Add Word**
- Users MUST be able to add new words to the word bank
- Words MUST only contain uppercase letters (A-Z)
- Empty words MUST NOT be allowed
- Duplicate words MUST NOT be allowed
- Numbers and special characters MUST NOT be allowed

**REQ-WB-03: Edit Word**
- Users MUST be able to edit existing words
- Same validation rules as adding words MUST apply
- The correct word (the one clicked) MUST be modified

**REQ-WB-04: Delete Word**
- Users MUST be able to delete words from the word bank
- The correct word (the one clicked) MUST be removed
- User MUST be prompted for confirmation before deletion

**REQ-WB-05: Persistence**
- All word bank changes MUST persist after page refresh
- Words MUST be stored in browser localStorage
- The same localStorage key MUST be used for saving and loading

**REQ-WB-06: Word Count**
- The word bank MUST display the total number of words
- The count MUST update when words are added, edited, or deleted

---

### 2. Player Setup

**REQ-PS-01: Player Names**
- The application MUST require two player names
- Player names MUST NOT be empty
- Player 1 and Player 2 MUST have different names
- Player names MUST be displayed during gameplay

**REQ-PS-02: Start Game**
- The "Start Game" button MUST validate player names
- The game area MUST become visible after starting
- The first round MUST begin automatically

---

### 3. Game Flow

**REQ-GF-01: Round Initialization**
- Each round MUST select a random word from the word bank
- The same word MUST NOT appear in consecutive rounds
- All guessed letters MUST be reset at the start of each round
- Wrong guesses counter MUST reset to 0
- Lives MUST reset to 6

**REQ-GF-02: Player Turns**
- Player 1 MUST play the first round
- Players MUST alternate after each round completes
- The current player MUST be highlighted in green
- The inactive player MUST not be highlighted

**REQ-GF-03: Word Selection**
- If word bank is empty, the game MUST display an error message
- Words MUST be selected randomly
- Previously used words MAY be selected again (but not immediately consecutive)

---

### 4. Gameplay Mechanics

**REQ-GM-01: Letter Guessing**
- Players MUST click alphabet buttons to guess letters
- Each letter MUST only be clickable once per round
- Clicking a letter MUST disable that button
- Correct letters MUST appear in the word display
- Incorrect letters MUST increment the wrong guesses counter

**REQ-GM-02: Word Display**
- Unguessed letters MUST be shown as underscores (_)
- Correctly guessed letters MUST be shown in their positions
- All letters of the word MUST be revealed when guessed

**REQ-GM-03: Wrong Guesses Display**
- Only incorrect letter guesses MUST appear in "Wrong Guesses" section
- Correct letters MUST NOT appear in "Wrong Guesses"
- "None yet" MUST be displayed if no wrong guesses have been made

**REQ-GM-04: Lives Counter**
- Lives MUST start at 6
- Lives MUST decrease by 1 for each wrong guess
- Lives display MUST show: "Lives Remaining: X / 6"
- Lives counter MUST be accurate and match wrong guesses

**REQ-GM-05: Hangman Drawing**
- Parts MUST appear in this order: head, body, left arm, right arm, left leg, right leg
- One part MUST appear for each wrong guess
- Parts MUST appear in correct anatomical order
- All 6 parts visible means the player lost

---

### 5. Win/Loss Conditions

**REQ-WL-01: Winning a Round**
- A player wins when all letters of the word are guessed correctly
- The winning player MUST receive 10 points
- The winning player's score MUST increment
- A success message MUST display the winner's name
- The message MUST be displayed with success styling (green)
- Players MUST switch turns after a win

**REQ-WL-02: Losing a Round**
- A player loses when they make 6 wrong guesses
- No points MUST be awarded for losing
- A loss message MUST display the losing player's name
- The message MUST be displayed with error styling (red)
- Players MUST switch turns after a loss
- The word MUST be revealed in the message

**REQ-WL-03: Score Tracking**
- Player 1's score MUST be displayed in the left score box
- Player 2's score MUST be displayed in the right score box
- Scores MUST increment only for the winning player
- Scores MUST persist throughout the game session

**REQ-WL-04: Next Round**
- "Next Round" button MUST appear after each round ends
- Clicking "Next Round" MUST reset the game for the next player
- The next player MUST be the one who didn't play the previous round

---

### 6. User Interface

**REQ-UI-01: Tab Navigation**
- Two tabs MUST be available: "Play Game" and "Word Bank"
- Only one tab content MUST be visible at a time
- Active tab MUST be highlighted
- Tab switching MUST work without page refresh

**REQ-UI-02: Theme Toggle**
- A theme toggle button MUST be visible in the header
- Clicking the toggle MUST switch between light mode and dark mode
- Light mode MUST use bright colors (default)
- Dark mode MUST use dark colors with light text
- Theme preference MUST persist across page refreshes
- The icon MUST change: 🌙 (moon) for light mode, ☀️ (sun) for dark mode

**REQ-UI-03: Word Bank Visibility**
- Word bank tab content MUST be hidden during active gameplay
- Players SHOULD NOT be able to cheat by viewing the word bank mid-game
- Warning or prevention mechanism SHOULD be implemented

**REQ-UI-04: Keyboard Display**
- All 26 alphabet letters MUST be displayed as buttons
- Buttons MUST be arranged in a grid
- Disabled buttons MUST be visually distinct (grayed out)
- Enabled buttons MUST be interactive with hover effects

**REQ-UI-05: Responsive Feedback**
- All user actions MUST provide immediate visual feedback
- Success actions MUST use green/positive colors
- Error actions MUST use red/negative colors
- Game status messages MUST be clearly visible

---

### 7. Data Persistence

**REQ-DP-01: Word Bank Storage**
- Word bank MUST be saved to localStorage
- Changes MUST persist across browser sessions
- Data MUST survive page refresh

**REQ-DP-02: Game State**
- Game scores MAY or MAY NOT persist (not specified)
- Current round state MUST NOT persist on refresh
- New game starts fresh after page reload

---

## Non-Functional Requirements

**REQ-NF-01: Browser Compatibility**
- Application MUST work in modern web browsers
- localStorage MUST be supported

**REQ-NF-02: Performance**
- All user interactions MUST respond within 100ms
- No lag or delay in button clicks

**REQ-NF-03: Usability**
- Interface MUST be intuitive
- Error messages MUST be clear and helpful
- Visual feedback MUST be consistent

---

## Validation Checklist

Use this checklist to verify the application meets all requirements:

### Word Bank
- [ ] Default 20 words load on first use
- [ ] Can add valid words (letters only)
- [ ] Cannot add empty words
- [ ] Cannot add duplicate words
- [ ] Cannot add words with numbers/symbols
- [ ] Edit modifies the correct word
- [ ] Delete removes the correct word
- [ ] Changes persist after refresh
- [ ] Word count is accurate

### Player Setup
- [ ] Cannot start with empty player names
- [ ] Cannot have same name for both players
- [ ] Names display correctly in game

### Gameplay
- [x] Correct letters appear in word
- [x] Wrong letters appear in "Wrong Guesses"
- [ ] Letter buttons disable after click
- [x] Lives counter accurate (starts at 6, decreases by 1)
- [x] Hangman parts appear in correct order
- [ ] Same word doesn't repeat immediately

### Win/Loss
- [ ] Winning player gets 10 points
- [ ] Winning player's name appears in message
- [ ] Win message has success colors (green)
- [ ] Loss message has error colors (red)
- [ ] Players alternate turns properly
- [x] Correct player plays next round

### UI/UX
- [ ] Tabs switch correctly
- [ ] Theme toggle switches between light and dark mode
- [ ] Theme preference persists after refresh
- [ ] Dark mode styles apply correctly
- [ ] Word bank not easily visible during play
- [ ] All buttons work as expected
- [ ] Visual feedback is appropriate
- [ ] No console errors

---

## Expected Behavior Examples

### Example 1: Adding a Valid Word
1. Click "Word Bank" tab
2. Type "TERRAFORM" in input field
3. Click "Add Word"
4. **Expected**: Word appears in list, word count increases by 1, input clears

### Example 2: Adding an Invalid Word
1. Type "" (empty) or "DEV123" or "DEV-OPS"
2. Click "Add Word"
3. **Expected**: Error message or prevention, word NOT added to bank

### Example 3: Winning a Round (Player 1)
1. Player 1 guesses all letters correctly
2. **Expected**: 
   - Message: "🎉 Player 1 won! The word was: DOCKER"
   - Player 1 score increases by 10
   - Message background is green
   - Player 2 plays next round

### Example 4: Deleting a Word
1. Word bank has: [DEVOPS, AGILE, DOCKER]
2. Click "Delete" on AGILE
3. **Expected**: AGILE is removed, word bank shows [DEVOPS, DOCKER]

### Example 5: Letter Guessing
1. Word is "DOCKER"
2. Click "D"
3. **Expected**: "D" appears at positions 1 and 5, button disables
4. Click "X"
5. **Expected**: "X" appears in "Wrong Guesses", hangman head appears, lives show 5/6

### Example 6: Theme Toggle
1. Click the 🌙 button in header
2. **Expected**: 
   - Icon changes to ☀️
   - Page switches to dark mode (dark background, light text)
   - All elements adopt dark theme colors
3. Click the ☀️ button
4. **Expected**: 
   - Icon changes to 🌙
   - Page switches back to light mode
5. Refresh page
6. **Expected**: Theme preference is remembered

---

## Questions for Testing

When testing, ask yourself:
- Does the displayed information match reality?
- Are the right things happening at the right time?
- Do actions have the correct consequences?
- Is data being saved and loaded correctly?
- Are error cases handled appropriately?
- Can users cheat or break the game?

---

*This requirements document serves as the source of truth for expected application behavior. Any deviation from these requirements should be reported as a bug.*
