import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import {List, ListItem} from 'material-ui/List';
import CircularProgress from 'material-ui/CircularProgress';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import LastUpdated from './../last-updated.js';
import SearchResult from "./search-result.js"
import ComponentActionButton from "./../../containers/ComponentActionButton.js"

const renderItems = (items, _id) => {
    const renderItem = ({name, id, enabled, isPending, actionFailed}) => (
        <ListItem
              key={name}
              primaryText={name}
              rightIconButton ={
                  <ComponentActionButton
                      active={enabled}
                      serverId={_id}
                      componentId={id}
                      isPending={isPending}
                      actionFailed={actionFailed}
                  />
              }
              secondaryText={name}/>
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

export default props => {
    return (
        <SearchResult {...props} renderItems={renderItems}/>
    )
}