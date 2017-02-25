import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import {List, ListItem} from 'material-ui/List';
import CircularProgress from 'material-ui/CircularProgress';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';

const renderItems = items => {
    const renderItem = item => (
        <ListItem
              key={item.name}
              primaryText={item.name}
              secondaryText={item.symbolicName}/>
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

const renderChunk = (totalAmount, stateTimeComponentFactory) => chunk => {
    var style = {
        width: "" + Math.floor(100 / totalAmount) + "%",
        //textAlign: 'center',
        display: 'inline-block'
    };

    var {id, title, items} = chunk;
    const StateTime = stateTimeComponentFactory(id);

    return (
        <Paper style={style} zDepth={1} key={id}>
            <Subheader>{title} <StateTime/></Subheader>
            <Divider/>
            {items ? renderItems(items) : <CircularProgress />}
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
                {this.props.chunks.map(renderChunk(this.props.chunks.length, this.props.stateTimeComponentFactory))}
            </div>
        );
    }
}

export default SearchResult;