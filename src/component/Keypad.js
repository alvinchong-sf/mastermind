import React from 'react';

class Keypad extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            guessNum: [],
            secretNum: "1234"
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleEnter = this.handleEnter.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleEnter() {
        if(this.state.secretNum === this.state.guessNum) {
            console.log("you win");
        } else {
            console.log("you lose");
        }
    }

    handleClick(e) {
        // if(this.state.guessNum.length < 4) {
        //     this.setState({guessNum: this.state.guessNum += e.currentTarget.value});
        // }
        this.setState({guessNum: this.state.guessNum.push("hello")})
    }

    handleDelete(e) {

    }


    render() {
        return (
            <div>
                {this.state.guessNum}
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
                    <button onClick={this.handleDelete}>D</button>
                </div>
                <button onClick={this.handleEnter}>Enter</button>
            </div>
        )
    }
}

export default Keypad;