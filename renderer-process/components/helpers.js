import {FOUND, INVALID_CREDENTIALS, NOT_FOUND} from "./../../common/statuses.js";
import {green500, red500, indigo500} from 'material-ui/styles/colors'

let map = {

}

map[FOUND] = {
    text: "Online",
    color: green500
};
map[NOT_FOUND] = {
    text: "Offline",
    color: red500
};
map[INVALID_CREDENTIALS] = {
    text: "Invalid credentials",
    color: indigo500
};

export default {
    statusText: statusCode => map[statusCode].text,
    statusColor: statusCode => map[statusCode].color
}
