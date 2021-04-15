import React from 'react';

const Modal = (props) => {

    return (
        <div className="outer-modal">
            <div className="inner-modal">
                <h1 className="modal-header">Play Mastermind!</h1>
                <h2 className="instructions">Instructions:</h2>
                <h3 className="content">The objective of the game is to guess the secret combination using the keypad provided before the timer runs out or under 10 tries.</h3>
                <h3 className="instructions">Good Luck!</h3>
                <div className="modal-button-container">
                    <button className="modal-button" onClick={props.handleStartMed}>Start Game (normal)</button>
                    <button className="modal-button" onClick={props.handleStartHard}>Start Game (hard)</button>
                </div>
            </div>
        </div>
    )
}

export default Modal