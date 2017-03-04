import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import searchButton from "./../components/material/search-button.js"
import {startBundlesSearch, startComponentsSearch} from "./../actions/search-actions.js"

const mapStateToProps = searchId => state => {
    let searchData = state.searches[searchId];

    let servers = state.servers.items
        .filter( ({id}) => searchData && searchData.checkboxes && searchData.checkboxes[id])
        .map( ({id, name}) => ({id, title: name}));

    return {
        text: searchData ? searchData.value : undefined,
        servers
    }
}

const mapDispatchToProps = (actionCreator, searchId) => dispatch => {
    return {
        onClick: ({text, servers}) => dispatch(actionCreator({searchId, text, servers}))
    }
}

const mergeProps = ({text, servers}, {onClick}) => {
    return {
        onClick: () => onClick({text, servers})
    }
}

const component = (actionCreator, searchId) =>
    connect(mapStateToProps(searchId), mapDispatchToProps(actionCreator, searchId), mergeProps)(searchButton);

export default {
    Bundles: component(startBundlesSearch, "bundles"),
    Components: component(startComponentsSearch, "components")
}