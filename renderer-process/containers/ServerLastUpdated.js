import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import lastUpdated from "./../components/last-updated.js"

const mapStateToProps = id => state => {
    let server = state.servers.items.find(x => x.id === id)
    let time = server && server.lastStatus ? server.lastStatus.time : null;
    return {time};
}

export default serverId => connect(mapStateToProps(serverId))(lastUpdated);