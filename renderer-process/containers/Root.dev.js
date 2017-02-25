import React, { PropTypes } from 'react'
import { Provider } from 'react-redux'
import DevTools from './DevTools.js'
import ServerList from "./ServerList.js"
import Form from "./../components/material/new-server.js"
import AppBar from 'material-ui/AppBar';
import {startSubmit} from 'redux-form'

import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import {addServer, removeServer, fetchServers, fetchBundles} from "./../api.js";
import {showNewServerForm, hideNewServerForm, showDrawer} from "./../actions";
import Drawer from './Drawer.js';
import Tabs from "./../components/material/tabs.js"

import Paper from 'material-ui/Paper';

fetchServers();

class Root extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    var store = this.props.store;
    return (
        <Provider store={store}>
            {/*<MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>*/}
                <div>
                    <AppBar title="AEM Tool" onLeftIconButtonTouchTap={ () => store.dispatch(showDrawer())}>

                    </AppBar>
                    <Tabs/>
                    <Drawer>
                        <ServerList fetchBundles={fetchBundles} removeServer={removeServer} onAddClick={() => store.dispatch(showNewServerForm())}/>
                    </Drawer>
                    <Form add={addServer}/>
                    <DevTools/>
                </div>
            {/*</MuiThemeProvider>*/}
        </Provider>
    )
  }
}


Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root
