import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import searchField from "./../components/material/search-field.js"
import {changeCheckboxState, changeSearchFieldValue} from "./../actions/search-actions.js"

const mapStateToProps = searchId => state => {
    let search = state.searches[searchId];
    return {
        value: (search && search.value) ? search.value : "",
        checkboxes: state.servers.items.map(server => ({
            id: server.id,
            title: server.name,
            checked: (search && search.checkboxes && search.checkboxes[server.id]) || false
        }))
    }
}

const mapDispatchToProps = searchId => dispatch => ({
    changeCheckboxState: (checkboxId, checked) => {dispatch(changeCheckboxState({searchId, checked, checkboxId}))},
    changeFieldValue: value => {dispatch(changeSearchFieldValue({searchId, value}))}
})

export default searchId => connect(mapStateToProps(searchId), mapDispatchToProps(searchId))(searchField);