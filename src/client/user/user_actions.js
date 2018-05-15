import ActionConstants from '../common/action_constants';

const user_actions = {
  createUser: (payload) => ({
    type: ActionConstants.USER.CREATEUSER,
    payload
  }),
  userCreationSuccess: (payload) => ({
    type: ActionConstants.USER.CREATEUSERSUCCESS,
    payload
  }),
};

export default user_actions;