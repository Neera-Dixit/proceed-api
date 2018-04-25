import { combineReducers } from 'redux';
import home from './home/home_reducer';
import login from './login/login_reducer';
import user from './user/User_reducer';

const rootReducers = combineReducers({
  home,
  login,
  user
});

export default rootReducers;
