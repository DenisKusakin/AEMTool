import { call, put, takeEvery, takeLatest, take, fork } from 'redux-saga/effects'
import { eventChannel, END } from 'redux-saga'
import {CTRL_F, ESC, SHORTCUT} from "./../constants.js";
import {showSearchField, hideSearchField} from "./../actions";

function getChannel() {
    return eventChannel(emitter => {
        ipcRenderer.on(SHORTCUT, (event, type) => emitter({type}))

        return () => {}
    })
}

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