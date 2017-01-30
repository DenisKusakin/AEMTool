import Drawer from 'material-ui/Drawer';
import { connect } from 'react-redux'
import {hideDrawer} from "./../actions/index.js"
import React from 'react'

const mapStateToProps = (state) => ({
    open: state.drawer
})

const mapDispatchToProps = (dispatch) => ({
    hide: () => dispatch(hideDrawer())
})

export default connect(mapStateToProps, mapDispatchToProps)(props => {

    return (<Drawer
      docked={false}
      width={400}
      open={props.open}
      onRequestChange={props.hide}>
      {props.children}
    </Drawer>);
})