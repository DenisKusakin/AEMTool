import "babel-polyfill";
require('./less/main.less');

import store from './renderer-process/store/configureStore.js'
import React from "react";
import ReactDOM from 'react-dom'
import Root from "./renderer-process/containers/Root.dev.js";

//Material UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const App = () => (
  <MuiThemeProvider>
    <Root store={store}/>
  </MuiThemeProvider>
);

ReactDOM.render(
    <App/>
, document.getElementById('content'));