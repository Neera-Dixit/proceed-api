import { delay } from 'redux-saga';
import ACTION from '../common/action_constants.js';
import { takeLatest, put, call } from 'redux-saga/effects';
import HTTPClient from '../utils/httpclient';
import APIConfig from '../common/api_config';
import loginActions from './login_actions';

/*
function* about(action) {
    yield delay(3000);
    yield put({type:ACTION.ABOUT.LOADABOUT});
}
export {
    about
}; */

function* authenticateuserHandler(authUserPayload) {
  const { HTTPMethod, url } = APIConfig.authenticateUser;

  try {
  const userData = yield HTTPClient[HTTPMethod]({ url, body: authUserPayload.payload });
  yield put(loginActions.userAuthSuccess(userData));
  } catch (error) {
  yield put(loginActions.userAuthFailure(error));
  }
}
export default function* loginSaga() {
  yield takeLatest(ACTION.USER.AUTHENTICATEUSER,authenticateuserHandler);
}