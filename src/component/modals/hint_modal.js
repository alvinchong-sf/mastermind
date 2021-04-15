import React from 'react';

const HintModal = (props) => {
    
    
    const hint = () => {
        if(props.table.length === 0) {
            return `The Secret Number at the first position is ${props.secretNum[0]}`
        } else {
            const lastGuessArr = props.table[props.table.length - 1][0];
            for(let i = 0; i < lastGuessArr.length; i++) {
                let num1 = lastGuessArr[i];
                let num2 = props.secretNum[i];
                if(num1 !== num2) {
                    return `The secret number at position ${i + 1} is ${num2}`;
                }
            }
        }
    }

    return(
        <div className="outer-hint-modal">
            <div className="inner-hint-modal">
                <h4>I am Hint</h4>
                <div>{hint()}</div>
                <div>
                    <button onClick={props.handleShowHintModal}>close</button>
                </div>
            </div>
        </div>
    )
}

export default HintModal;