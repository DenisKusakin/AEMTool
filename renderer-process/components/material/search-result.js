import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import {List, ListItem} from 'material-ui/List';
import CircularProgress from 'material-ui/CircularProgress';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import BundleActionButton from './bundle-action-button.js';
import LastUpdated from './../last-updated.js';

import {startBundle, stopBundle} from "./../../api.js"

const renderItems = (items, _id) => {
    const renderItem = ({name, symbolicName, stateRaw, id}) => (
        <ListItem
              key={name}
              primaryText={name}
              rightIconButton ={
                  <BundleActionButton active={stateRaw === 32}
                      start={() => startBundle({_id, bundleId: id})}
                      stop={() => stopBundle({_id, bundleId: id})}
                  />
              }
              secondaryText={symbolicName}/>
    )
    return (
        items.length > 0
            ?
            (<List>
                {items.map(renderItem)}
            </List>)
            :
            (<span>Empty</span>)
    );
}

const renderChunk = (totalAmount) => chunk => {
    var style = {
        width: "" + Math.floor(100 / totalAmount) + "%",
        //textAlign: 'center',
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

class SearchResult extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div>
                {this.props.chunks.map(renderChunk(this.props.chunks.length))}
            </div>
        );
    }
}

export default SearchResult;