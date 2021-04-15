import React from 'react';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';

const HintModal = (props) => {
    

    const hint = () => {
        if(props.table.length === 0) {
            return `The secret number at position 1 is ${props.secretNum[0]}`
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
                <div className="hint-container">
                    <div className="hint-header">{hint()}</div>
                    <div className="hint-button-container">
                        <button onClick={props.handleShowHintModal}><CancelOutlinedIcon color="secondary"/></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HintModal;