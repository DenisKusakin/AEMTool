import React, { PropTypes } from 'react'
import { Provider } from 'react-redux'
import DevTools from './DevTools.js'
import ServerList from "./ServerList.js"

import Form from "./../components/new-server.js"

const {addServer, removeServer} = remote.require("./main-process/api/index.js");

class Root extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    var store = this.props.store;
    return (
        <Provider store={store}>
            <div>
              <ServerList removeServer={removeServer}/>
              <Form add={addServer}/>
              <DevTools/>
            </div>
        </Provider>
    )
  }
}


Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root
