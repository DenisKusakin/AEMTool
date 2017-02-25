import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {ServerList} from "./../components/material"

export default connect(state => state.servers)(ServerList);