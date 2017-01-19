import servers from "./../../common/reducers/servers.js"
import updateServerStatus from "./update-server-status.js"
import {combineReducers} from "redux"

import { reducer as formReducer } from 'redux-form'

export const rootReducer = combineReducers(
    {
        servers: (state, action) => {
            var newState = servers(state, action);
            if(state === newState){
                return updateServerStatus(state, action);
            }

            return newState;
        }, 
        form: formReducer
    }
);