import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import {List, ListItem} from 'material-ui/List';
import CircularProgress from 'material-ui/CircularProgress';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import LastUpdated from './../last-updated.js';
import SearchResult from "./search-result.js"
import ComponentActionButton from "./../../containers/ComponentActionButton.js"
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

const renderItems = (items, _id) => {
    const renderItem = ({name, id, enabled, isPending, actionFailed, state}) => (
        <TableRow key={name}>
            <TableRowColumn style={{width: "10%"}}>{enabled ? id : ""}</TableRowColumn>
            <TableRowColumn style={{width: "45%"}}>
                {name}
            </TableRowColumn>
            {/*<TableRowColumn style={{width: "10%"}}>{version}</TableRowColumn>
            <TableRowColumn style={{width: "5%"}}>{category}</TableRowColumn>*/}
            <TableRowColumn style={{width: "20%"}}>{state}</TableRowColumn>
            <TableRowColumn style={{width: "15%"}}>
                <ComponentActionButton
                      active={enabled}
                      serverId={_id}
                      componentId={id}
                      isPending={isPending}
                      actionFailed={actionFailed}/>
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
                    <TableHeaderColumn style={{width: "45%"}}>Name</TableHeaderColumn>
                    {/*<TableHeaderColumn style={{width: "10%"}}>Version</TableHeaderColumn>
                    <TableHeaderColumn style={{width: "5%"}}>Category</TableHeaderColumn>*/}
                    <TableHeaderColumn style={{width: "20%"}}>Status</TableHeaderColumn>
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