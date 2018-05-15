import { delay } from 'redux-saga';
import { takeLatest, put, call } from 'redux-saga/effects';
import ACTION from '../common/action_constants.js';
import HTTPClient from '../utils/httpclient';
import APIConfig from '../common/api_config';
import AppUtil from '../common/appUtils'
import userActions from './user_actions';

function* createUserHandler({payload:createUserPayload}) {
  debugger;
  let { HTTPMethod, url } = APIConfig.createUser;

  const token = AppUtil.getHeaderTokenValue();
  const headers = {'Authorization': "bearer " + token};

  try {
  const { data } = yield HTTPClient[HTTPMethod]({ url, headers, body: createUserPayload });
  yield put(userActions.userCreationSuccess(data.message));
  } catch (error) {
  console.log(error);
  }
}

export default function* userSaga() {
 yield takeLatest(ACTION.USER.CREATEUSER,createUserHandler);
}