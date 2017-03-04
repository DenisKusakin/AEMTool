import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import SearchField from "./../../containers/SearchField.js";
import SearchResult from "./../../containers/SearchResult.js";
import SearchButton from "./../../containers/SearchButton.js";
import CodeEditor from "./../code-editor.js";

const TabsExampleSimple = () => (
    <Tabs>
        <Tab label="Groovy" >
            <CodeEditor/>
        </Tab>
        <Tab label="Bundles" >
            <SearchField.Bundles/>
            <SearchButton.Bundles/>
            <SearchResult.Bundles/>
        </Tab>
        <Tab label="Components" >
            <SearchField.Components/>
            <SearchButton.Components/>
            <SearchResult.Components/>
        </Tab>
    </Tabs>
);

export default TabsExampleSimple;