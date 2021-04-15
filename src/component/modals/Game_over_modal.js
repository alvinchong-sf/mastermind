import React from 'react';

const GameOverModal = (props) => {
    const winHeader = "You Win!";
    const loseHeader = "You Lose!";
    const winMsg = "Try Again?";
    const loseMsg = "Better luck next time!";
    return (
        <div className="outer-modal">
            <div id="game-over-modal" className="inner-modal">
                <h1 className="modal-header">{props.win ? winHeader : loseHeader}</h1>
                <h2 className="modal-header">{props.timer === 0 ? "Out of time!" : `Score ${props.score}/100!`}</h2>
                <h2 className="modal-header">{props.win ? winMsg : loseMsg}</h2>
                <div className="modal-button-container">
                    <button className="modal-button" onClick={props.handleRestartMedium}>Restart Game(Medium)</button>
                    <button className="modal-button" onClick={props.handleRestartHard}>Restart Game(Hard)</button>
                </div>
            </div>
        </div>
    )
}

export default GameOverModal;