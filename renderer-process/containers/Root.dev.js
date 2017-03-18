import React, { PropTypes } from 'react'
import { Provider } from 'react-redux'
import DevTools from './DevTools.js'
import ServerList from "./ServerList.js"
import NewServerDialog from "./NewServerDialog.js"
import Noty, {showNotification} from "./../components/material/notifications.js"
import AppBar from 'material-ui/AppBar';

import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import {showDrawer} from "./../actions";
import Drawer from './Drawer.js';
import Tabs from "./../components/material/tabs.js"

import Paper from 'material-ui/Paper';

class Root extends React.Component{
  constructor(props){
    super(props);
    showNotification({});
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
                        <ServerList/>
                    </Drawer>
                    <NewServerDialog/>
                    <Noty/>
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
