import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import {List, ListItem} from 'material-ui/List';
import CircularProgress from 'material-ui/CircularProgress';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import LastUpdated from './../last-updated.js';
import SearchResult from "./search-result.js"
import BundleActionButton from "./../../containers/BundleActionButton.js"

const renderItems = (items, _id) => {

    const renderItem = ({name, symbolicName, enabled, id, version, category, state, isPending, actionFailed}) => (
        <TableRow key={name}>
            <TableRowColumn style={{width: "10%"}}>{id}</TableRowColumn>
            <TableRowColumn style={{width: "55%"}}>
                <div>
                    <span style={{fontSize: "small"}}>
                        { name }
                        <br/>
                        {symbolicName}
                    </span>
                    <span style={{fontSize: "xx-small"}}>
                        {"-" + version}
                    </span>
                </div>
            </TableRowColumn>
            {/*<TableRowColumn style={{width: "10%"}}>{version}</TableRowColumn>
            <TableRowColumn style={{width: "5%"}}>{category}</TableRowColumn>*/}
            <TableRowColumn style={{width: "10%"}}>{state}</TableRowColumn>
            <TableRowColumn style={{width: "15%"}}>
                <BundleActionButton
                    active={enabled}
                    serverId={_id}
                    bundleId={id}
                    isPending={isPending}
                    actionFailed={actionFailed}
                />
            </TableRowColumn>
        </TableRow>
    )
    return (
        items.length > 0
            ?
            <Table
                showCheckboxes={false}>
                <TableHeader
                    displaySelectAll={false}
                    adjustForCheckbox={false}
                    enableSelectAll={false}>
                    <TableRow>
                        <TableHeaderColumn style={{width: "10%"}}>ID</TableHeaderColumn>
                        <TableHeaderColumn style={{width: "55%"}}>Name</TableHeaderColumn>
                        {/*<TableHeaderColumn style={{width: "10%"}}>Version</TableHeaderColumn>
                        <TableHeaderColumn style={{width: "5%"}}>Category</TableHeaderColumn>*/}
                        <TableHeaderColumn style={{width: "10%"}}>Status</TableHeaderColumn>
                        <TableHeaderColumn style={{width: "15%"}}>Actions</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                    {items.map(renderItem)}
                </TableBody>
            </Table>
            :
            <span>Empty</span>
    );
}

export default props => {
    return (
        <SearchResult {...props} renderItems={renderItems}/>
    )
}