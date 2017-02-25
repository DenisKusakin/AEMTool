import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';

const renderCheckbox = changeCheckboxState => ({checked, title, id}) => {
    return (
        <Checkbox
            label={title}
            key={id}
            onCheck={(e, checked) => changeCheckboxState(id, checked)}
            checked={checked}/>
    );
}

class SearchSection extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div>
                <div>
                    {this.props.checkboxes.map(renderCheckbox(this.props.changeCheckboxState))}
                </div>
                <TextField
                    hintText="Search"
                    style={{textColor: "black"}}
                    onChange={(e, value) => this.props.changeFieldValue(value)}
                    value={this.props.value}
                    fullWidth={true}/>
            </div>
        );
    }
}

export default SearchSection