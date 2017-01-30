import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {addServer, removeServer} from "./../actions/index.js"
import {ServerList} from "./../components/material"

const mapStateToProps = (state) => {
    let {servers} = state;

    return servers;
}

export default connect(mapStateToProps)(ServerList)