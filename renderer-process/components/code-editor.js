import React, {Component} from 'react';
import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/groovy';
import 'brace/theme/github';

export default props => {
    function onChange(newValue) {
      console.log('change',newValue);
    }

    return <AceEditor
            mode="groovy"
            theme="github"
            onChange={onChange}
            name="UNIQUE_ID_OF_DIV"
            editorProps={{$blockScrolling: true}}
          />
}