import React from 'react';

const GameOverModal = (props) => {

    return (
        <div className="outer-modal">
            <div className="inner-modal">
                <h1>You Lose!</h1>
                <h1 className="modal-header">Game Over!</h1>
                <div className="modal-button-container">
                    <button className="modal-button" onClick={props.handleRestart}>Restart Game</button>
                </div>
            </div>
        </div>
    )
}

export default GameOverModal;