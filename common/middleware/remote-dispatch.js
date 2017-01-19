const _ = require("underscore");
const REMOTE_ACTION = "REMOTE_ACTION";

const middleware = dispatch => store => next => action => {
    if(action[REMOTE_ACTION]){
        if(action[REMOTE_ACTION] === true){
            let newAction = _.clone(action);
            delete newAction[REMOTE_ACTION]
            dispatch(newAction);
        }else{
            dispatch(action[REMOTE_ACTION]);
        }
    }

    return next(action);
}

module.exports.REMOTE_ACTION = REMOTE_ACTION;
module.exports = middleware;