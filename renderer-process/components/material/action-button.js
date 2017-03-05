import React, {Component} from 'react';
import Play from 'material-ui/svg-icons/av/play-arrow.js';
import Stop from 'material-ui/svg-icons/av/stop.js';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import CircularProgress from 'material-ui/CircularProgress';

export default props => {
    let {isPending, active, start, stop} = props;

    return (
        <FloatingActionButton mini={true} disabled={isPending}>
            {active
                ?
            <Stop onClick={stop}/>
                :
            <Play onClick={start}/>}
        </FloatingActionButton>
    );
}