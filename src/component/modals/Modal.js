import React from 'react';

const Modal = (props) => {

    return (
        <div className="outer-modal">
            <div className="inner-modal">
                <h1 className="modal-header">Play Mastermind!</h1>
                <div className="modal-button-container">
                    <button className="modal-button" onClick={props.handleStart}>Start Game</button>
                </div>
            </div>
        </div>
    )
}

export default Modal