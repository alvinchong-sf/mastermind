import React from 'react';
import Modal from './modals/Modal';
import GameOverModal from './modals/Game_over_modal';
import IncorrectGuess from '../audio/incorrect_guess.mp3';
import Win from '../audio/win.mp3';
import GameOver from '../audio/game_over.mp3';
import HintModal from './modals/hint_modal';
// import Response from './response';

class Keypad extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            guessNum: [],
            secretNum: ["1","2","3","1"],
            errors: "",
            numAttempts: 10,
            showModal: true,
            table: [],
            win: false,
            score: 100,
            timer: 300,
            difficulty: null,
            showHintModal: false,
            hintLife: 1
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleEnter = this.handleEnter.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.handleStartMed = this.handleStartMed.bind(this);
        this.handleRestartMedium = this.handleRestartMedium.bind(this);
        this.handleRestartHard = this.handleRestartHard.bind(this);
        this.handleStopMusic = this.handleStopMusic.bind(this);
        this.handlePlayMusic = this.handlePlayMusic.bind(this);
        this.handlePauseMusic = this.handlePauseMusic.bind(this);
        this.handleCountDown = this.handleCountDown.bind(this);
        this.interval = null;
        this.handleStartHard = this.handleStartHard.bind(this);
        this.handleShowHintModal = this.handleShowHintModal.bind(this);
    }

    componentDidMount() {
        // this.handleNewCode();
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    async handleMediumCode() {
        const url = "https://www.random.org/integers/?num=4&min=0&max=7&col=1&base=10&format=plain&rnd=new";
        const response = await fetch(url);
        if(!response.ok) this.setState({errors: `Error! status: ${response.status}, please reload the page!`});
        const data = await response.text();
        const arr = data.split("\n");
        const newArr = arr.slice(0, arr.length - 1);
        this.setState({secretNum: newArr});
        // this.setState({secretNum: ["1","2","3","4"]});  // use for testing
        console.log(`This is the secret code ${this.state.secretNum}`); // for developers to cheat
    }

    async handleHardCode() {
        const url = "https://www.random.org/integers/?num=6&min=0&max=7&col=1&base=10&format=plain&rnd=new";
        const response = await fetch(url);
        if(!response.ok) this.setState({errors: `Error! status: ${response.status}, please reload the page!`});
        const data = await response.text();
        const arr = data.split("\n");
        const newArr = arr.slice(0, arr.length - 1);
        this.setState({secretNum: newArr});
        console.log(`This is the secret code ${this.state.secretNum}`); // for developers to cheat
    }

    handleStartMed() {
        this.setState({showModal: !this.state.showModal, difficulty: "medium"});
        this.handlePlayMusic();
        this.handleInterval();
        // this.handleMediumCode();
    }

    handleStartHard() {
        this.setState({showModal: !this.state.showModal, difficulty: "hard"});
        this.handlePlayMusic();
        this.handleInterval();
        this.handleHardCode();
    }

    handleRestartMedium() {
        this.setState({guessNum: [], numAttempts: 10, table: [], win: false, score: 100, timer: 300, difficulty: "medium"});
        this.handleMediumCode();
        this.handlePlayMusic();
        this.handleInterval();
    }

    handleRestartHard() {
        this.setState({guessNum: [], numAttempts: 10, table: [], win: false, score: 100, timer: 300, difficulty: "hard"});
        this.handleHardCode();
        this.handlePlayMusic();
        this.handleInterval();
    }

    handleGameOver() {
        // code below won't work because state does not change immediately 
        // !this.state.win ? this.handleWinAudio() : this.handleLoseAudio();
        this.handleStopMusic();
        clearInterval(this.interval);
    }

    handleEnter() {
        const numExact = this.handleNumExactMatches();
        const numNear = this.handleNumNearMatches(); 

        // if the guess code is not at least 4 || 6 numbers
        if(this.state.guessNum.length < this.state.secretNum.length) {
            alert(`Minimum ${this.state.secretNum.length} digit code require`);
        } // The player had guessed the secret code
        else if(this.state.secretNum.join("") === this.state.guessNum.join("")) {  // o(n) linear
            this.setState({win: true})
            this.handleGameOver();
            this.handleWinAudio()
            console.log("you win");
        } else {
            // The player has a incorrect guess
            this.setState({numAttempts: this.state.numAttempts - 1, score: this.state.score - 10})
            if(this.state.numAttempts <= 1) {
                this.handleGameOver();
                this.handleLoseAudio();
                console.log("you lose")
                return;
            }
            this.setState({table: this.state.table.concat([[this.state.guessNum, numExact, numNear]])}) // o(n) linear | concat because can't mutate state
            this.handleClear();
            this.handleIncorrectGuessAudio();
            console.log("try again");
        }
    }

    handleClick(e) {
        if(this.state.guessNum.length < this.state.secretNum.length) {
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
                                                                                                            
        // 3rd attempt at fixing the logic using hash
        // secret = [1,2,3,1]
        // guess = [1,1,0,0]
        // counter = 1
        // {
        //   1: 0            
        //   2: 1,
        //   3: 1
        // }
        // time o(n) | space o(n)

        let counter = 0;
        let hash = {};
        for(let i = 0; i < this.state.secretNum.length; i++) {
            let num = this.state.secretNum[i];
            if(num === this.state.guessNum[i]) continue; // skip exact matches
            if(hash[num] === undefined) hash[num] = 0;
            hash[num]++;
        }

        for(let i = 0; i < this.state.guessNum.length; i++) {
            let num = this.state.guessNum[i];
            if(hash[num] > 0) {
                counter++; hash[num]--;
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

    handleIncorrectGuessAudio() {
        const audio = new Audio(IncorrectGuess);
        audio.play();
    }

    handleWinAudio() {
        const audio = new Audio(Win);
        audio.play();
    }

    handleLoseAudio() {
        const audio = new Audio(GameOver);
        audio.play();
    }

    handleCountDown() {
        this.setState({timer: this.state.timer - 1});
        if(this.state.timer === 0) {
            this.setState({numAttempts: 0})
            this.handleGameOver();
            this.handleLoseAudio();
        }
    }

    handleInterval() {
        clearInterval(this.interval);
        this.interval = setInterval(this.handleCountDown, 1000);
    }

    handleShowHintModal() {
        if(this.state.showHintModal === false) {
            clearInterval(this.interval);
            this.handlePauseMusic();
        } else {
            this.interval = setInterval(this.handleCountDown, 1000);
            this.handlePlayMusic();
        }
        this.setState({showHintModal: !this.state.showHintModal, hintLife: this.state.hintLife - 1})
    }

    render() {
        const idx = this.state.guessNum.length - 1;
        const backSpace = "<--";
        let normal = "__ __ __ __";
        let hard = "__ __ __ __ __ __"

        return (
            <div>
                {/* Main Game Interaction UI */}
                <div className="keypad-outer-container">
                    <div>
                        <h1 className="left-header">Guess the secret code</h1>
                        <h1 className="random-code-error">{this.state.errors.length > 1 ? this.state.errors : ""}</h1>
                        {/* <h2 className="code-enter">{this.state.guessNum.length ? this.state.guessNum : "__ __ __ __" }</h2> */}
                        <h2 className="code-enter">
                            {this.state.guessNum.length === 0 ? (this.state.difficulty === "medium" ? normal : hard) : this.state.guessNum.join(" ")}
                        </h2>
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

                        {/* Music Component */}
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
                        {/* Timer, Attempts Remaning, Hint Button */}
                        <h1 className="attempt-header">Attempts Remaining: {this.state.numAttempts}</h1>
                        <div className="timer-hint-container">
                            <h2>
                                <span className="timer-color-left">Timer:</span><span className="timer-color-right"> {this.state.timer}</span>
                            </h2>
                            <div>
                                {this.state.hintLife > 0 ? 
                                    <button className="hint-button" onClick={this.handleShowHintModal}><div>Hint</div>(limit 1 per game!)</button> :
                                    <button className="fake-hint-button">Hint (Unavailable!)</button>
                                }
                            </div>
                        </div>

                        {/* Game Opening Modal, Game Over Modal, Hint Modal */}
                            {this.state.showModal ? <Modal handleStartMed={this.handleStartMed} handleStartHard={this.handleStartHard}/> : ""}
                            {this.state.numAttempts <= 0 || this.state.win ? <GameOverModal 
                                                                                handleRestartMedium={this.handleRestartMedium} 
                                                                                handleRestartHard={this.handleRestartHard}
                                                                                win={this.state.win} 
                                                                                score={this.state.score}
                                                                                timer={this.state.timer}
                                                                                />: ""} 
                            {this.state.showHintModal ? <HintModal 
                                                            handleShowHintModal={this.handleShowHintModal} 
                                                            showHintModal={this.state.showHintModal} 
                                                            secretNum={this.state.secretNum}
                                                            table={this.state.table}
                                                            /> : ""}
                        {/* Feedback History */}
                        <div className="feedback-container">
                            <h3 className="feedback-header">Feedback</h3>
                            <div>
                                {this.state.table.slice().reverse().map((arr, i) => {
                                    return(
                                        <ul key={i} className="feedback-list-container">
                                            <li><span className="feedback-title">Incorrect Guess:</span><span className="feedback-answer"> {arr[0]}</span></li>
                                            <li><span className="feedback-title">Exact Matches:</span><span className="feedback-answer"> {arr[1]}</span></li>
                                            <li><span className="feedback-title">Near Matches:</span><span className="feedback-answer"> {arr[2]}</span></li>
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