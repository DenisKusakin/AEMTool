import { call, put, takeEvery, takeLatest, take, fork } from 'redux-saga/effects'
import { eventChannel, END } from 'redux-saga'
import {showSearchField, hideSearchField} from "./../actions";
const ServicesApi = remote.require("./main-process/services-api.js");

function* shortcuts() {
    const channel = yield call(getChannel);
    try{
        while(true){
            let {type} = yield take(channel);

            if(type === CTRL_F){
                yield put(showSearchField())
            }else if(type === ESC){
                yield put(hideSearchField())
            }
        }
    }finally{

    }
}

export default shortcuts;