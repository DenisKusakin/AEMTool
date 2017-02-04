import React, {Component} from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';

class AutoCompleteExampleSimple extends Component {
  constructor(props){
    super(props);
    this.handleUpdateInput = this.handleUpdateInput.bind(this);
    this.state = {dataSource: []};
  }

  handleUpdateInput(value) {
    this.setState({
      dataSource: [
          {
            text: 'text-value1',
            value: (
              <MenuItem
                primaryText="text-value1"
                secondaryText="&#9786;"
              />
            ),
          },
          {
            text: "",
            value: (<Divider/>)
          },
          {
            text: 'text-value2',
            value: (
              <MenuItem
                primaryText="text-value2"
                secondaryText="&#9786;"
              />
            ),
          }
      ],
    });
  }

  render() {
    return (
      <div>
        <AutoComplete
          hintText="Type anything"
          dataSource={this.state.dataSource}
          filter={AutoComplete.noFilter}
          onUpdateInput={this.handleUpdateInput}
        />
      </div>
    );
  }
}

export default AutoCompleteExampleSimple