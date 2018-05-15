import ACTION from '../common/action_constants';

function userReducer(state = {}, action) {
  switch(action.type) {
    case ACTION.USER.CREATEUSERSUCCESS: {
      return { ...state, 
        userCreation: {
          status: true,
          message: action.payload
        }
      }
    }

    default : return state;
  }
}

export default userReducer;
