import React from "react";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import {startBundle, stopBundle} from "./../../api.js"

const iconByStatusCode = status => {
    if(status === 32){
        return "stop"
    }else{
        return "play"
    }
}
export default props => {
    let getOnClickFunc = ({status, id}) => {
        if(status === 32){
            return () => stopBundle(props._id, id);
        }else{
            return () => startBundle(props._id, id);
        }
    }

    let renderItem = (item) => {
        return (<TableRow key={item.id}>
            <TableRowColumn>{item.id}</TableRowColumn>
            <TableRowColumn>{item.name}</TableRowColumn>
            <TableRowColumn>{item.state}</TableRowColumn>
            <TableRowColumn>
                <IconButton onClick={getOnClickFunc(item)}>
                    <FontIcon>
                        {iconByStatusCode(item.stateRaw)}
                    </FontIcon>
                </IconButton>
            </TableRowColumn>
        </TableRow>);
    }
    return (
        <Table
            showCheckboxes={false}>
            <TableHeader
                displaySelectAll={false}
                adjustForCheckbox={false}
                enableSelectAll={false}>
                <TableRow>
                    <TableHeaderColumn>ID</TableHeaderColumn>
                    <TableHeaderColumn>Name</TableHeaderColumn>
                    <TableHeaderColumn>State</TableHeaderColumn>
                    <TableHeaderColumn>Action</TableHeaderColumn>
                </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
                {props.bundles.list.map(renderItem)}
            </TableBody>
        </Table>
    )
}