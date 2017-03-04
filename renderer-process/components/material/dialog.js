import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

const actions = (close) => [
    <FlatButton
    label="Cancel"
    primary={false}
    keyboardFocused={true}
    onTouchTap={close}
    />
]

export default props => {
    
    return (
        <Dialog
            title="New Server"
            actions={actions(props.close)}
            modal={false}
            open={props.open}>
            {props.children}
        </Dialog>
    );
}