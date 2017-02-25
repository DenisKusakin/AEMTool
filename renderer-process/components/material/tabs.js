import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import smartSearchField from "./../../containers/SearchField.js";
import searchResult from "./../../containers/SearchResult.js";
import searchButton from "./../../containers/SearchButton.js";
import {stateTime} from "./../../containers/SearchResult.js";
const {bundles, components} = remote.require("./main-process/search-api.js");

const BundlesSearchField = smartSearchField("bundles-search");
const BundlesSearchResult = searchResult("bundles-search");
const BundlesSearchButton = searchButton(bundles)("bundles-search");

const searchComponents = (id, searchFunc) => {
    const SearchField = smartSearchField(id);
    const SearchResult = searchResult(id);
    const SearchButton = searchButton(searchFunc)(id);

    return (
        <div>
            <SearchField/>
            <SearchButton/>
            <SearchResult stateTimeComponentFactory={stateTimeComponentFactory}/>
        </div>
    )
}

const stateTimeComponentFactory = stateTime("bundles-search");

const TabsExampleSimple = () => (
    <Tabs>
        <Tab label="Bundles" >
            {searchComponents("bundles", bundles)}
        </Tab>
        <Tab label="Components" >
            {searchComponents("components", components)}
        </Tab>
    </Tabs>
);

export default TabsExampleSimple;