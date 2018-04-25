import { delay } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import ACTION from '../../common/action_constants.js';
// import { getDataWithToken } from '../../../utils/ajax';
import Api from '../../common/api_config';
function* route1Saga(action) {
    // const data = yield call(getDataWithToken, Api.getUser);
}

export {
    route1Saga
};