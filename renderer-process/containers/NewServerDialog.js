import React from 'react'
import { connect } from 'react-redux'
import Dialog from "./../components/material/dialog.js"
import { reduxForm } from 'redux-form'
import {hideNewServerForm} from "./../actions";
import NewServer from "./NewServer.js"

export default connect(
    state => ({open: state.newServerFormVisible}),
    dispatch => ({
        close: () => dispatch(hideNewServerForm())
    })
)(
    props => (
        <Dialog {...props}>
            <NewServer/>
        </Dialog>
    )
)