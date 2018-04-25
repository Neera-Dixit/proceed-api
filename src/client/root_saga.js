import { takeEvery } from 'redux-saga/effects';
import ACTION from './common/action_constants';
import {home} from './home/home_saga';
import {route1Saga} from './home/route1/route1_saga';
import {user} from './user/User_saga';

function* userHandler(){
  console.log("entered");
  console.log(user);
  debugger;
}
export default function* rootSaga () {
  // yield takeEvery(ACTION.HOME.GETHOME, home);
  yield takeEvery(ACTION.USER.CREATEUSER, user);
}
