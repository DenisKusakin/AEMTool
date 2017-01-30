import { connect } from 'react-redux'
import React from 'react'
import bundles from "./../components/material/bundles-table.js"

const mapStateToProps = state => ({
    bundles: state.bundles
})

export default connect(mapStateToProps)(bundles)