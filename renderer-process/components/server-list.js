import React, {PropTypes} from "react";
//import {removeServer} from "./../../common/actions/index.js"

class ServerItem extends React.Component{
    render(){
        return( 
            <div className="server-item">
                <h3>{this.props.name}</h3> <a onClick={this.props.onRemoveClick}>Remove</a>
            </div>
        )
    }
}

ServerItem.propTypes = {
    name: PropTypes.string.isRequired,
    onRemoveClick: PropTypes.func.isRequired,
}

class ServerList extends React.Component{

    constructor(props){
        super(props);
        this.onRemoveClick = id => () => this.props.removeServer(id);
    }

    render(){
        return  (<div className="server-list">
            <h2>Servers:</h2> 
            {this.props.items.map(item => <ServerItem key={item.id} name={item.name} onRemoveClick={this.onRemoveClick(item.id)}/>)}
        </div>)
    }
}

export default ServerList;