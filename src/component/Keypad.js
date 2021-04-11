import React from 'react';
import Modal from './modals/Modal';
import GameOverModal from './modals/Game_over_modal';
import IncorrectGuess from '../audio/incorrect_guess.mp3';
import Win from '../audio/win.mp3';
import GameOver from '../audio/game_over.mp3';

class Keypad extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            guessNum: [],
            secretNum: [],
            numAttempts: 10,
            showModal: true,
            table: [],
            win: false,
            time: 60,
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleEnter = this.handleEnter.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.handleStart = this.handleStart.bind(this);
        this.handleRestart = this.handleRestart.bind(this);
        this.handleStopMusic = this.handleStopMusic.bind(this);
        this.handlePlayMusic = this.handlePlayMusic.bind(this);
        this.handlePauseMusic = this.handlePauseMusic.bind(this);
    }

    componentDidMount() {
        this.handleNewCode();
    }

    async handleNewCode() {
        const url = "https://www.random.org/integers/?num=4&min=0&max=7&col=1&base=10&format=plain&rnd=new";
        const response = await fetch(url);
        // if(!response.ok) throw new Error(`Error! status: ${response.status}`);
        const data = await response.text();
        const arr = data.split("\n");
        const newArr = arr.slice(0, arr.length - 1)
        this.setState({secretNum: newArr});
        console.log(`This is the secret code ${this.state.secretNum}`);
    }

    handleStart() {
        this.setState({showModal: !this.state.showModal});
        this.handlePlayMusic();
    }

    handleRestart() {
        this.setState({guessNum: [], numAttempts: 10, table: [], win: false});
        this.handleNewCode();
        this.handlePlayMusic();
    }

    handleEnter() {
        const numExact = this.handleNumExactMatches();
        const numNear = this.handleNumNearMatches(); 

        // if the guess code is not at least 4 numbers
        if(this.state.guessNum.length < 4) {
            alert("Minimum 4 digit code require");
        } // The player had guessed a correct number and its correct location
        else if(this.state.secretNum.join("") === this.state.guessNum.join("")) {
            this.handleStopMusic();
            this.setState({win: true})
            this.handleWinAudio();
            console.log("you win");
        } else {
            // The player has a incorrect guess
            this.setState({numAttempts: this.state.numAttempts - 1})
            if(this.state.numAttempts <= 1) {
                this.handleStopMusic();
                this.handleGameOverAudio();
                console.log("you lose")
                return;
            }
            this.setState({table: this.state.table.concat([[this.state.guessNum, numExact, numNear]])})
            this.handleClear();
            console.log("try again");
            this.handleIncorrectGuess();
        }
    }

    handleClick(e) {
        if(this.state.guessNum.length < 4) {
            this.setState({guessNum: this.state.guessNum.concat([e.currentTarget.value])});
        }
    }

    handleDelete(idx) {
        return (e) => {
            const newList = this.state.guessNum.filter((num, i) => i !== idx);
            this.setState({guessNum: newList});
        }
    }

    handleClear() {
        this.setState({guessNum: []});
    }

    handleNumExactMatches() {
        let counter = 0;
        for(let i = 0; i < this.state.guessNum.length; i++) {
            if(this.state.guessNum[i] === this.state.secretNum[i]) counter++
        }
        return counter;
    }

    handleNumNearMatches() {
        // The player had guess a correct number (number exist but not at the right location)
        let counter = 0;
        for(let i = 0; i < this.state.guessNum.length; i++) {
            const secretCode = this.state.secretNum;
            const currNum = this.state.guessNum[i];
            if(secretCode.includes(currNum) && secretCode[i] !== currNum) {
                counter++
            }
        }
        return counter;
    }

    handlePlayMusic() {
        const audio = document.getElementById("audio-container");
        audio.play();
    }

    handleStopMusic() {
        const audio = document.getElementById("audio-container");
        audio.pause();
        audio.currentTime = 0;
    }

    handlePauseMusic() {
        const audio = document.getElementById("audio-container");
        audio.pause();
    }

    handleIncorrectGuess() {
        const audio = new Audio(IncorrectGuess);
        audio.play();
    }

    handleWinAudio() {
        const audio = new Audio(Win);
        audio.play();
    }

    handleGameOverAudio() {
        const audio = new Audio(GameOver);
        audio.play();
    }

    render() {
        const idx = this.state.guessNum.length - 1;
        const backSpace = "<--";
        let result = ""
        if(this.state.guessNum.length === 1) {
            result = `__ __ __ ${this.state.guessNum}`
        } else if (this.state.guessNum.length === 2) {
            result = `__ __ ${this.state.guessNum[0]} ${this.state.guessNum[1]}`
        } else if (this.state.guessNum.length === 3) {
            result = `__ ${this.state.guessNum[0]} ${this.state.guessNum[1]} ${this.state.guessNum[2]}`
        } else if (this.state.guessNum.length === 4) {
            result = `${this.state.guessNum[0]} ${this.state.guessNum[1]} ${this.state.guessNum[2]} ${this.state.guessNum[3]}`
        } else {
            result = "__ __ __ __"
        }

        return (
            <div className="keypad-outer-container">
                <div id="hello">
                    <h1>Guess the secret code</h1>
                    {/* <h2>{this.state.guessNum.length ? this.state.guessNum : "__ __ __ __" }</h2> */}
                    <h2 className="code-enter">{result}</h2>
                    <div className="number-button-container">
                        <button id="button1" onClick={this.handleClick} value="1">1</button>
                        <button id="button2" onClick={this.handleClick} value="2">2</button>
                        <button id="button3" onClick={this.handleClick} value="3">3</button>
                    </div>
                    <div className="number-button-container">
                        <button id="button4" onClick={this.handleClick} value="4">4</button>
                        <button id="button5" onClick={this.handleClick} value="5">5</button>
                        <button id="button6" onClick={this.handleClick} value="6">6</button>
                    </div>
                    <div className="number-button-container">
                        <button id="button7" onClick={this.handleClick} value="7">7</button>
                        <button id="button0" onClick={this.handleClick} value="0">0</button>
                        <button id="buttonD" onClick={this.handleDelete(idx)}>{backSpace}</button>
                    </div>
                    <div className="enter-clear-delete-container">
                        <button id="buttonC" onClick={this.handleClear}>Clear</button>
                        <button id="buttonE" onClick={this.handleEnter}>Enter</button>
                    </div>
                    <div className="music-container">
                        <div>
                            <h4 className="music-heading">Music Controls</h4>
                            <div className="music-button-container">
                                <button onClick={this.handlePlayMusic}>Resume</button>
                                <button onClick={this.handlePauseMusic}>Pause</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="feedback-container">
                    <h1 className="attempt-header">Attempts Remaining: {this.state.numAttempts}</h1>
                    <h2>Timer: {this.state.time}</h2>
                    {this.state.showModal ? <Modal handleStart={this.handleStart}/> : ""}
                    {this.state.numAttempts <= 0 || this.state.win ? <GameOverModal handleRestart={this.handleRestart} win={this.state.win} />: ""}
                    <div>
                        {this.state.table.slice().reverse().map((arr, i) => {
                            return(
                                <ul key={i}>
                                    <li>Incorrect Guess: {arr[0]}</li>
                                    <li>Exact Matches: {arr[1]}</li>
                                    <li>Near Matches: {arr[2]}</li>
                                </ul>
                            )
                        })}
                    </div>
                    <audio id="audio-container" loop>
                        <source src="https://ia803101.us.archive.org/24/items/KahootLobbyMusic/Kahoot%20Lobby%20Music%20%28HD%29.mp3"></source>
                    </audio>
                </div>

            </div>
        )
    }
}

export default Keypad;