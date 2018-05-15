import { delay } from 'redux-saga';
import { takeLatest, put, call } from 'redux-saga/effects';
import ACTION from '../common/action_constants.js';
import HTTPClient from '../utils/httpclient';
import homeActions from './home_actions';
// import { getDataWithToken } from '../../utils/ajax';
import APIConfig from '../common/api_config';
import AppUtil from '../common/appUtils'
/*
function* home(action) {
    const data = yield call(getDataWithToken, Api.getUser);
    console.log(data);
    yield put({type:ACTION.HOME.LOADHOME});
    yield put({type: ACTION.HOME.STOREUSER, user: data});
}

export {
    home
}; */

function* getProjectListHandler({payload:projectListPayload}) {
  let { HTTPMethod, url } = APIConfig.projectDetails;

  url += `?userID=${projectListPayload.userID}`;
  const token = AppUtil.getHeaderTokenValue();
  const headers = {'Authorization': "bearer " + token};

  try {
  const projectList = yield HTTPClient[HTTPMethod]({ url, headers });
  yield put(homeActions.projectListFetchSuccess(projectList.data));
  } catch (error) {
  yield put(homeActions.projectListFetchFailure(error));
  }
}

export default function* homeSaga() {
 yield takeLatest(ACTION.USER.GETPROJECTLIST,getProjectListHandler);
}