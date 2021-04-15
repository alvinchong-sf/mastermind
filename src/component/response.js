import React from 'react';

const Response = (props) => {

    let result;
    // if(props.difficulty === "medium") {
    //     if(props.guessNum.length === 1) {
    //         result = `__ __ __ ${props.guessNum}`
    //     } else if (props.guessNum.length === 2) {
    //         result = `__ __ ${props.guessNum[0]} ${props.guessNum[1]}`
    //     } else if (props.guessNum.length === 3) {
    //         result = `__ ${props.guessNum[0]} ${props.guessNum[1]} ${props.guessNum[2]}`
    //     } else if (props.guessNum.length === 4) {
    //         result = `${props.guessNum[0]} ${props.guessNum[1]} ${props.guessNum[2]} ${props.guessNum[3]}`
    //     } else {
    //         result = "__ __ __ __";
    //     }
    // } else {
    //     if(props.guessNum.length === 1) {
    //         result = `__ __ __ __ __ ${props.guessNum}`
    //     } else if (props.guessNum.length === 2) {
    //         result = `__ __ __ __ ${props.guessNum[0]} ${props.guessNum[1]}`
    //     } else if (props.guessNum.length === 3) {
    //         result = `__ __ __ ${props.guessNum[0]} ${props.guessNum[1]} ${props.guessNum[2]}`
    //     } else if (props.guessNum.length === 4) {
    //         result = `__ __ ${props.guessNum[0]} ${props.guessNum[1]} ${props.guessNum[2]} ${props.guessNum[3]}`
    //     } else if (props.guessNum.length === 5){
    //         result = `__ ${props.guessNum[0]} ${props.guessNum[1]} ${props.guessNum[2]} ${props.guessNum[3]} ${props.guessNum[4]}`
    //     } else if (props.guessNum.length === 6){
    //         result = `${props.guessNum[0]} ${props.guessNum[1]} ${props.guessNum[2]} ${props.guessNum[3]} ${props.guessNum[4]} ${props.guessNum[5]}`
    //     } else {
    //         result = "__ __ __ __ __ __";
    //     }
    // }

    return(
        <div>
            {result}
        </div>
    )

};

export default Response;