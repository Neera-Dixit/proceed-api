import {delay} from 'redux-saga';
import {call, put, takeEvery, select, all, take, fork, takeLatest} from 'redux-saga/effects';
import ACTION from '../common/action_constants.js';
// import {GetData, PostData} from '../../utils/ajax';
import Api from '../common/api_config';


function* user(action) {
        try{        
            // yield put({type : ACTION.LOADER.SHOW_LOADER});
            const userInfo = yield call(PostData, Api.createUser, action.data);        
        }
        catch(e){
            console.error(e);
        }

		// yield put({type : ACTION.LOADER.HIDE_LOADER});
		// yield put({type : ACTION.LOADER.HIDE_LOADER});
	
}
export {user};