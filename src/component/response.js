import React from 'react';

// const Response = (props) => {

    // if guessNum.length === 1
    // "__ __ __ __" => "__ __ __ guessNum[i]"

    // if guessNum.length === 2
    // "__ __ __ __" => "__ __"
    // ---------------------------------------------------------------------------
    // let normal = "__ __ __ __";
    // let hard = "__ __ __ __ __ __"
    // const helper = () => {
    //     let result = [];
    //     const newArr = new Array(props.secretNum.length).fill("__")
    //     result = newArr;
    //     console.log(newArr);
    
    //     // [__ __ __ __]
    //     let numTimesToPop = props.secretNum.length;
    //     for(let i = 1; i <= numTimesToPop; i++) {
    //         result.pop();
    //     }
    //     props.guessNum.forEach((num) => {
    //         result.push(num)
    //     })
    //     return result;
    // }
    // ---------------------------------------------------------------------------
    // let result;
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
        // if(props.guessNum.length === 1) {
        //     result = `__ __ __ __ __ ${props.guessNum}`
        // } else if (props.guessNum.length === 2) {
        //     result = `__ __ __ __ ${props.guessNum[0]} ${props.guessNum[1]}`
        // } else if (props.guessNum.length === 3) {
        //     result = `__ __ __ ${props.guessNum[0]} ${props.guessNum[1]} ${props.guessNum[2]}`
        // } else if (props.guessNum.length === 4) {
        //     result = `__ __ ${props.guessNum[0]} ${props.guessNum[1]} ${props.guessNum[2]} ${props.guessNum[3]}`
        // } else if (props.guessNum.length === 5){
        //     result = `__ ${props.guessNum[0]} ${props.guessNum[1]} ${props.guessNum[2]} ${props.guessNum[3]} ${props.guessNum[4]}`
        // } else if (props.guessNum.length === 6){
        //     result = `${props.guessNum[0]} ${props.guessNum[1]} ${props.guessNum[2]} ${props.guessNum[3]} ${props.guessNum[4]} ${props.guessNum[5]}`
        // } else {
        //     result = "__ __ __ __ __ __";
    //     }
    // ------------------------------------------------------------------------------
    

    // return(
    //     <div>
    //         {/* {helper.length === 0 ? (props.difficulty === "medium" ? normal : hard) : helper.join(" ")} */}
    //         {/* {result} */}
    //     </div>
    // )
// }

class Response extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            resultArr: []
        }
    }

    handleInput() {
        this.setState({resultArr: this.props.guessNum})
    }

    render() {
        let normal = "__ __ __ __";
        let hard = "__ __ __ __ __ __"
        return(
            <div>
                {this.state.resultArr.length === 0 ? (this.props.difficulty === "medium" ? normal : hard) : this.state.resultArr.join(" ")}
            </div>
        )
    }
}

export default Response;