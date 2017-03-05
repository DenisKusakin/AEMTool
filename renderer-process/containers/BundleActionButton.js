import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import BundleActionButton from "./../components/material/action-button.js"
import {startBundle, stopBundle} from "./../actions/search-actions.js"

const mapStateToProps = state => ({

})

const mapDispatchToProps = searchId => ({serverId, bundleId}) => dispatch => {
    return {
        start: () => dispatch(startBundle({searchId, serverId, itemId: bundleId})),
        stop: () => dispatch(stopBundle({searchId, serverId, itemId: bundleId}))
    }
}

export default ({serverId, bundleId, ...rest}) => {
    let WrappedButton = connect(mapStateToProps, mapDispatchToProps("bundles")({serverId, bundleId}))(BundleActionButton)
    return <WrappedButton {...rest}/>
}