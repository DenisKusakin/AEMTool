import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import {List, ListItem} from 'material-ui/List';
import CircularProgress from 'material-ui/CircularProgress';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import LastUpdated from './../last-updated.js';

const renderChunk = (totalAmount, renderItems) => chunk => {
    var style = {
        width: "" + Math.floor(100 / (totalAmount > 0 ? totalAmount : 1)) + "%",
        display: 'inline-block'
    };

    var {id, title, items, stateTime} = chunk;

    return (
        <Paper style={style} zDepth={1} key={id + stateTime}>
            <Subheader>{title} <LastUpdated time={stateTime}/></Subheader>
            <Divider/>
            {items ? renderItems(items, id) : <CircularProgress />}
        </Paper>
    );
}

export default props => (
    <div>
        {props.chunks.map(renderChunk(props.chunks.length, props.renderItems))}
    </div>
);