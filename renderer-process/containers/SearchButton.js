import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import searchButton from "./../components/material/search-button.js"
import {startSearch} from "./../listeners/search.js"

const mapStateToProps = searchFunc => searchId => state => {
    let searchData = state.searches[searchId];

    let servers = state.servers.items
        .filter( ({id}) => searchData && searchData.checkboxes && searchData.checkboxes[id])
        .map( ({id, name}) => ({id, title: name}));

    const onClick = () => {
        startSearch(searchFunc)(searchId)({text: searchData.value, servers})
    }

    return {onClick}
}

export default searchFunc => searchId => connect(mapStateToProps(searchFunc)(searchId))(searchButton);