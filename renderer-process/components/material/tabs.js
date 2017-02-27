import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import smartSearchField from "./../../containers/SearchField.js";
import searchResult from "./../../containers/SearchResult.js";
import searchButton from "./../../containers/SearchButton.js";
import {stateTime} from "./../../containers/SearchResult.js";
import CodeEditor from "./../code-editor.js";
const {bundles, components} = remote.require("./main-process/search-api.js");

const searchComponents = (id, searchFunc) => {
    const SearchField = smartSearchField(id);
    const SearchResult = searchResult(id);
    const SearchButton = searchButton(searchFunc)(id);

    return (
        <div>
            <SearchField/>
            <SearchButton/>
            <SearchResult/>
        </div>
    )
}

const TabsExampleSimple = () => (
    <Tabs>
        <Tab label="Groovy" >
            <CodeEditor/>
        </Tab>
        <Tab label="Bundles" >
            {searchComponents("bundles", bundles)}
        </Tab>
        <Tab label="Components" >
            {searchComponents("components", components)}
        </Tab>
    </Tabs>
);

export default TabsExampleSimple;