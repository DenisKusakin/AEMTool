import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import BundleActionButton from "./../components/material/action-button.js"
import {startComponent, stopComponent} from "./../actions/search-actions.js"

const mapStateToProps = state => ({

})

const mapDispatchToProps = searchId => ({serverId, componentId}) => dispatch => {
    return {
        start: () => dispatch(startComponent({searchId, serverId, itemId: componentId})),
        stop: () => dispatch(stopComponent({searchId, serverId, itemId: componentId}))
    }
}

export default ({serverId, componentId, ...rest}) => {
    let WrappedButton = connect(mapStateToProps, mapDispatchToProps("components")({serverId, componentId}))(BundleActionButton)
    return <WrappedButton {...rest}/>
}