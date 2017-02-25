import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import searchField from "./../components/material/search-result.js"
import lastUpdated from "./../components/last-updated.js"

const mapStateToProps = searchId => state => {
    let search = state.searches[searchId]
    let chunks = search && search.result && search.result.chunks ? search.result.chunks : []

    return {chunks}
}

const mapStateToPropsLastUpdated = searchId => chunkId => state => {
    let search = state.searches[searchId]
    let chunk = search && search.result && search.result.chunks ? search.result.chunks.find( ({id}) => id === chunkId) : undefined;
    let stateTime = chunk ? chunk.stateTime : undefined;

    return {time: stateTime}
}

export default searchId => connect(mapStateToProps(searchId))(searchField);
export const stateTime = searchId => chunkId => connect(mapStateToPropsLastUpdated(searchId)(chunkId))(lastUpdated)