//import React from 'react';
//import Dialog from 'material-ui/Dialog';
//import { connect } from 'react-redux';
//import {hideSearchField} from "./../actions";
//import SearchField from "./../components/material/search-field.js";
//
//const customContentStyle = {
//  width: '100%',
//  maxWidth: 'none',
//};
//
//const dialog = (props) => (
//  <Dialog
//      title="Search"
//      modal={true}
//      contentStyle={customContentStyle}
//      open={props.open}>
//      <SearchField/>
//  </Dialog>
//);
//
//export default connect(
//    state => ({open: state.searchFieldVisible}),
//    dispatch => ({
//        close: hideSearchField
//    })
//)(dialog)