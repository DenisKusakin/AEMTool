import servers from "./../reducers/servers.js"
import searches from "./searches.js"
import bundles from "./bundles.js";
import {combineReducers} from "redux"
import {
    SHOW_NEW_SERVER_FORM,
    HIDE_NEW_SERVER_FORM,
    SHOW_DRAWER,
    HIDE_DRAWER,
    SHOW_SEARCH_FIELD,
    HIDE_SEARCH_FIELD
} from "./../actions/index.js"

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

        searchFieldVisible: (state = false, action) => {
            if (action.type === SHOW_SEARCH_FIELD){
                return true;
            } else if(action.type === HIDE_SEARCH_FIELD){
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

        bundles,

        searches: searches
    }
);