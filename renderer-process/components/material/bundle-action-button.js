import React, {Component} from 'react';
import Play from 'material-ui/svg-icons/av/play-arrow.js';
import Stop from 'material-ui/svg-icons/av/stop.js';
import FloatingActionButton from 'material-ui/FloatingActionButton';

export default props => {
    let {active, start, stop} = props;

    return (
        active ? <FloatingActionButton mini={true}><Stop onClick={stop}/></FloatingActionButton> : <FloatingActionButton mini={true}><Play onClick={start}/></FloatingActionButton>
    );
}