import React from "react";
import ReactInterval from 'react-interval';
const moment = require('moment');

const computeText = time => {
    return moment(time).fromNow();
}

class LastUpdated extends React.Component {
    constructor(props){
        super(props);
        this.updateState = () => {
            let text = computeText(props.time);
            this.setState({text})
        };
        this.state = !props.time ? null : {
            text: computeText(props.time)
        }
    }

    render(){
        return (
            <span>
                {this.state !== null ? "(" + this.state.text + ")" : ""}
                <ReactInterval timeout={1000} enabled={true}
                          callback={this.updateState} />
            </span>
        )
    }
}

export default LastUpdated;