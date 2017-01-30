import React from "react";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

export default props => {
    let renderItem = (item) => {
        return (<TableRow>
            <TableRowColumn>{item.id}</TableRowColumn>
            <TableRowColumn>{item.name}</TableRowColumn>
            <TableRowColumn>{item.state}</TableRowColumn>
        </TableRow>);
    }
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHeaderColumn>ID</TableHeaderColumn>
                    <TableHeaderColumn>Name</TableHeaderColumn>
                    <TableHeaderColumn>State</TableHeaderColumn>
                </TableRow>
            </TableHeader>
            <TableBody>
                {props.bundles.list.map(renderItem)}
            </TableBody>
        </Table>
    )
}