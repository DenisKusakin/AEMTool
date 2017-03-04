import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {ServerList} from "./../components/material"
import {fetchServers, showNewServerForm, removeServer} from "./../actions";

const mapStateToProps = state => {
    return {
        items: (state.servers && state.servers.items ? state.servers.items : [])
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchServers: () => dispatch(fetchServers()),
        onAddClick: () => dispatch(showNewServerForm()),
        removeServer: id => dispatch(removeServer(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(
    class Wrapper extends Component {
        constructor(props){
            props.fetchServers();
            super(props);
        }

        render(){
            return (
                <ServerList {...this.props}/>
            )
        }
    }
);