## Description
Mastermind is a guessing code game where a User can play against the computer. This is a game where a player tries to guess the number combinations. At the end of each attempt to guess the 4 number combinations, the computer will provide feedback whether the user had guess a number correctly, or/and a number and digit correctly. A player must guess the right number combinations within 10 attempts to win the game.

## Technologies
* React JS
* HTML
* CSS

## Installation

### Prerequisites
Node.js is required for Mastermind to operate, [click here to install Node.js](https://nodejs.dev/learn/how-to-install-nodejs)

### Setting Up and Running the App
Please run the following:

```
npm install
npm start
```

## Features
### 1. Start Game Modal
  * Ready to play? Start the game with a click of a button!
<img src="./public/images/start_game.png" height="300" >

### 2. Main game Layout
  * User can use the keypad UI to guess the 4 digit "secret code".
  * User can backspace a code if enter incorrectly or clear all code inputs.
  * Feedback is shown on the right that list the previous code, number of exact matches and number of near matches.
  * Beat the game before the timer runs out or in under 10 attempts. 
  * Music control on bottom left to pause and resume music.
<img src="./public/images/game.png" height="300" >

### 3. Game Over Modal
  * Replay the game and beat your previous score!
<img src="./public/images/end_game.png" height="300" >

## Upcoming Features
* Add Support to give hints
* Add "difficulty level"
