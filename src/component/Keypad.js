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
            score: 100,
            timer: 300
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
        this.handleCountDown = this.handleCountDown.bind(this);
        this.interval = null;
    }

    componentDidMount() {
        this.handleNewCode();
    }

    async handleNewCode() {
        const url = "https://www.random.org/integers/?num=4&min=0&max=7&col=1&base=10&format=plain&rnd=new";
        const response = await fetch(url);
        if(!response.ok) console.log(`Error! status: ${response.status}`);
        const data = await response.text();
        const arr = data.split("\n");
        const newArr = arr.slice(0, arr.length - 1)
        this.setState({secretNum: newArr});
        // this.setState({secretNum: ["1","2","3","4"]});  // use for testing
        console.log(`This is the secret code ${this.state.secretNum}`); // for developers to cheat
    }

    handleStart() {
        this.setState({showModal: !this.state.showModal});
        this.handlePlayMusic();
        this.handleInterval();
        console.log(this.name);
        // this.handleCountDown();
    }

    handleRestart() {
        this.setState({guessNum: [], numAttempts: 10, table: [], win: false, score: 100, timer: 300});
        this.handleNewCode();
        this.handlePlayMusic();
        this.handleInterval();
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
            this.setState({numAttempts: this.state.numAttempts - 1, score: this.state.score - 10})
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
            const newList = this.state.guessNum.slice(0, idx);
            this.setState({guessNum: newList});
        }
    }

    handleClear() {
        this.setState({guessNum: []});
    }

    handleNumExactMatches() {
        // time o(n) | space o(1)
        let counter = 0;
        for(let i = 0; i < this.state.guessNum.length; i++) {
            if(this.state.guessNum[i] === this.state.secretNum[i]) counter++
        }
        return counter;
    }

    handleNumNearMatches() {
        // The player had guess a correct number (number exist but not at the right location)
        // time o(n) | space o(n)

        let counter = 0;
        let copyArr = this.state.secretNum.slice();

        for(let i = 0; i < this.state.guessNum.length; i++) {
            if(this.state.guessNum[i] === this.state.secretNum[i]) {
                copyArr[i] = true;
            }
        }
  
        for(let j = 0; j < this.state.guessNum.length; j++) {
            if(copyArr.includes(this.state.guessNum[j]) && this.state.guessNum[j] !== copyArr[j]) {
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

    handleCountDown() {
        this.setState({timer: this.state.timer - 1});
        if(this.state.timer === 0) {
            clearInterval(this.interval);
            this.setState({numAttempts: 0})
            this.handleStopMusic();
            this.handleGameOverAudio();
        }
    }

    handleInterval() {
        this.interval = setInterval(this.handleCountDown, 1000);
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
            <div className="outer-outer-container">
                <div className="keypad-outer-container">
                    <div>
                        <h1 className="left-header">Guess the secret code</h1>
                        {/* <h2 className="code-enter">{this.state.guessNum.length ? this.state.guessNum : "__ __ __ __" }</h2> */}
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
                                    <button onClick={this.handlePauseMusic}>Pause</button>
                                    <button onClick={this.handlePlayMusic}>Resume</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h1 className="attempt-header">Attempts Remaining: {this.state.numAttempts}</h1>
                        <h2><span className="timer-color-left">Timer:</span><span className="timer-color-right"> {this.state.timer}</span></h2>
                            {this.state.showModal ? <Modal handleStart={this.handleStart}/> : ""}
                            {this.state.numAttempts <= 0 || this.state.win ? <GameOverModal 
                                                                                handleRestart={this.handleRestart} 
                                                                                win={this.state.win} 
                                                                                score={this.state.score}
                                                                                timer={this.state.timer}
                                                                                />: ""}
                        <div className="feedback-container">
                            <h3 className="feedback-header">Feedback</h3>
                            <div>
                                {this.state.table.slice().reverse().map((arr, i) => {
                                    return(
                                        <ul key={i} className="feedback-list-container">
                                            <li><span className="feedback-title">Incorrect Guess:</span><span className="feedback-answer"> {arr[0]}</span></li>
                                            <li><span className="feedback-title">Exact Matches:</span><span className="feedback-answer"> {arr[1]}</span></li>
                                            <li><span className="feedback-title">Near Matches:</span><span className="feedback-answer"> {arr[2]}</span></li>
                                            {/* <li>Exact Matches: {arr[1]}</li>
                                            <li>Near Matches: {arr[2]}</li> */}
                                        </ul>
                                    )
                                })}
                            </div>
                        </div>
                        <audio id="audio-container" loop>
                            <source src="https://ia803101.us.archive.org/24/items/KahootLobbyMusic/Kahoot%20Lobby%20Music%20%28HD%29.mp3"></source>
                        </audio>
                    </div>
                </div>
                 <footer className="footer">
                    2021 Designed and Developed by Alvin Chong
                </footer>
            </div>
        )
    }
}

export default Keypad;