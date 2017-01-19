import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {addServer, removeServer} from "./../../common/actions/index.js"
import ServerList from "./../components/server-list.js"

const mapStateToProps = (state) => {
    let {servers} = state;

    return servers;
}

export default connect(mapStateToProps)(ServerList)