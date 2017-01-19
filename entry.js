require('./less/main.less');

import store from './renderer-process/store/configureStore.js'
import React from "react";
import ReactDOM from 'react-dom'
import Root from "./renderer-process/containers/Root.dev.js";

ReactDOM.render(
    <Root store={store}/>
, document.getElementById('content'));