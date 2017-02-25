const moment = require('moment');

const timeValidator = allowedDiff => time => {
    let now = moment();
    let lastUpdate = moment(time);
    let diff = now.diff(lastUpdate);

    if(diff < allowedDiff){
        return true;
    }
    return false;
}

module.exports = {
    bundles: timeValidator(60 * 1000 * 10),
    serverStatus: timeValidator(5 * 1000)
}