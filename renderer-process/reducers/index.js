import servers from "./../reducers/servers.js"
import bundles from "./bundles.js";
//import updateServerStatus from "./update-server-status.js"
import {combineReducers} from "redux"
import {SHOW_NEW_SERVER_FORM, HIDE_NEW_SERVER_FORM, SHOW_DRAWER, HIDE_DRAWER} from "./../actions/index.js"
import { reducer as formReducer } from 'redux-form'

export const rootReducer = combineReducers(
    {
        servers, 
        
        newServerFormVisible: (state = false, action) => {
            if (action.type === SHOW_NEW_SERVER_FORM){
                return true;
            } else if(action.type === HIDE_NEW_SERVER_FORM){
                return false;
            }
            return state;
        },

        drawer: (state = false, action) => {
            if(action.type === SHOW_DRAWER){
                return true;
            }else if(action.type === HIDE_DRAWER){
                return false;
            }
            return state;
        },

        form: formReducer,

        bundles
    }
);