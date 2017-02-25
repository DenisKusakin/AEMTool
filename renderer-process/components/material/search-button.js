import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';

class SearchButton extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <RaisedButton label="Search" onClick={this.props.onClick} />
        );
    }
}

export default SearchButton;