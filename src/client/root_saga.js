import { takeEvery } from 'redux-saga/effects';
import ACTION from './common/action_constants';
import * as homeSaga from './home/home_saga';
import {route1Saga} from './home/route1/route1_saga';
import * as loginSaga from './login/login_saga';
import * as userSaga from './user/User_saga';
import { fork, all } from 'redux-saga/effects';

/*
function* userHandler(){
  console.log("entered");
  console.log(user);
  debugger;
}
export default function* rootSaga () {
  // yield takeEvery(ACTION.HOME.GETHOME, home);
  yield takeEvery(ACTION.USER.CREATEUSER, user);
} */


export default function* rootSaga() {
  yield all([
    // ...Object.values(route1Saga),
    ...Object.values(loginSaga),
    ...Object.values(homeSaga),
    ...Object.values(userSaga)
  ].map(fork));
}