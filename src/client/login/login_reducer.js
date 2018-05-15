import ACTION from '../common/action_constants';

function loginReducer(state = {},action){
  switch(action.type) {
    case ACTION.ABOUT.LOADABOUT: {
      tempState.load = true;
      return newState;
    }

    case ACTION.USER.AUTHUSERSUCCESS: {
      return {...state, loginStatus: 'success', loginstatusData: action.payload.data};
      return newState;
    }

    case ACTION.USER.AUTHUSERFAILURE: {
      return {...state, loginStatus: 'failure', loginstatusData: `${action.payload}`};
    }

    default : return state;
  }
}
export default loginReducer;
