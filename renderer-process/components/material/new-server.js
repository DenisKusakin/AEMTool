import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Form from './../new-server.js';
import {submit} from './../new-server.js';
import { connect } from 'react-redux';
import {showNewServerForm, hideNewServerForm, addServer, removeServer, updateStatus} from "./../../actions";

const actions = (close) => [
    <FlatButton
    label="Cancel"
    primary={false}
    keyboardFocused={true}
    onTouchTap={close}
    />
]

const dialog = (props) => {
    
    return (
        <Dialog
            title="New Server"
            actions={actions(props.close)}
            modal={false}
            open={props.open}>
            <Form add={props.add}/>
        </Dialog>
    );
}

export default connect(
    state => ({open: state.newServerFormVisible}),
    dispatch => ({
        close: () => dispatch(hideNewServerForm()),
        add: ({name, host, login, password}) => dispatch(addServer(name, host, login, password))
    })
)(dialog)