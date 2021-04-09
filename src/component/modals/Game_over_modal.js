import React from 'react';

const GameOverModal = (props) => {
    const winHeader = "You Win!"
    const loseHeader = "You Lose!"
    const winMsg = "Try Again?"
    const loseMsg = "Better luck next time"
    return (
        <div className="outer-modal">
            <div className="inner-modal">
                <h1 className="modal-header">{props.win ? winHeader : loseHeader}</h1>
                <h2 className="modal-header">{props.win ? winMsg : loseMsg}</h2>
                <div className="modal-button-container">
                    <button className="modal-button" onClick={props.handleRestart}>Restart Game</button>
                </div>
            </div>
        </div>
    )
}

export default GameOverModal;