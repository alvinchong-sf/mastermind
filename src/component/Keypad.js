import React from 'react';

class Keypad extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            guessNum: [],
            secretNum: [],
            numAttempts: 10,
            numMatches: 0,
            numNearMatches: 0,
            incorrectGuess: ""
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleEnter = this.handleEnter.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleClear = this.handleClear.bind(this);
    }

    async componentDidMount() {
        const url = "https://www.random.org/integers/?num=4&min=0&max=7&col=1&base=10&format=plain&rnd=new";
        const response = await fetch(url);
        const data = await response.text();
        const arr = data.split("\n");
        const newArr = arr.slice(0, arr.length - 1)
        this.setState({secretNum: newArr});
        console.log(this.state.secretNum);
    }

    handleEnter() {
        this.handleNumExactMatches();
        this.handleNumNearMatches();
        // The player had guessed a correct number and its correct location
        if(this.state.secretNum.join("") === this.state.guessNum.join("")) {
            console.log("you win");
        } // If the player had one life remaining
         else if(this.state.numAttempts === 1) {
            console.log("you lose");
        } // The player's guess was incorrect
         else {
            this.setState({numAttempts: this.state.numAttempts - 1})
            this.setState({incorrectGuess: this.state.guessNum})
            this.handleClear();
            console.log("try again");
        }
    }

    handleClick(e) {
        if(this.state.guessNum.length < 4) {
            this.setState({guessNum: this.state.guessNum.concat([e.currentTarget.value])});
        }
    }

    handleDelete(idx) {
        return (e) => {
            // const newList = this.state.guessNum.slice(0, idx)
            const newList = this.state.guessNum.filter((num, i) => i !== idx)
            this.setState({guessNum: newList});
        }
    }

    handleClear() {
        // console.log(typeof(this.state.secretNum))
        this.setState({guessNum: []});
    }

    handleNumExactMatches() {
        let counter = 0;
        for(let i = 0; i < this.state.guessNum.length; i++) {
            if(this.state.guessNum[i] === this.state.secretNum[i]) counter++
        }
        this.setState({numMatches: counter})
    }

    handleNumNearMatches() {
        let counter = 0;
        for(let i = 0; i < this.state.guessNum.length; i++) {
            const secretCode = this.state.secretNum;
            const currNum = this.state.guessNum[i];
            if(secretCode.includes(currNum) && secretCode[i] !== currNum) {
                counter++
            }
        }
        this.setState({numNearMatches: counter});
    }

    render() {
        const idx = this.state.guessNum.length - 1;
        return (
            <div>
                {this.state.guessNum.length ? this.state.guessNum : "Guess the secret code"}
                <div>
                    <button onClick={this.handleClick} value="0">0</button>
                    <button onClick={this.handleClick} value="1">1</button>
                    <button onClick={this.handleClick} value="2">2</button>
                </div>
                <div>
                    <button onClick={this.handleClick} value="3">3</button>
                    <button onClick={this.handleClick} value="4">4</button>
                    <button onClick={this.handleClick} value="5">5</button>
                </div>
                <div>
                    <button onClick={this.handleClick} value="6">6</button>
                    <button onClick={this.handleClick} value="7">7</button>
                    <button onClick={this.handleDelete(idx)}>Delete</button>
                </div>
                <button onClick={this.handleEnter}>Enter</button>
                <button onClick={this.handleClear}>Clear</button>
                <div>Attempts Remaining: {this.state.numAttempts}</div>
                <div>Exact matches: {this.state.numMatches}</div>
                <div>Near Matches: {this.state.numNearMatches}</div>
                <div>Incorrect code: {this.state.incorrectGuess}</div>
                {/* <div>
                    {this.state.secretNum.map((num, i) => {
                        return <li key={i}>{num}</li>
                    })}
                </div> */}
            </div>
        )
    }
}

export default Keypad;