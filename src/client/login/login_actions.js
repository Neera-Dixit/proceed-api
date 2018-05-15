
import ActionConstants from '../common/action_constants';

const login_actions = {
  authenticateUser : payload => ({
    type: ActionConstants.USER.AUTHENTICATEUSER,
    payload
  }),
  userAuthSuccess: payload => ({
    type: ActionConstants.USER.AUTHUSERSUCCESS,
    payload
  }),
  userAuthFailure: payload => ({
    type: ActionConstants.USER.AUTHUSERFAILURE,
    payload
  }),
};

export default login_actions;