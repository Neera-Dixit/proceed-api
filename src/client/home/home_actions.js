import ActionConstants from '../common/action_constants';

const home_actions = {
  getUserProjectList: (payload) => ({
    type: ActionConstants.USER.GETPROJECTLIST,
    payload
}),
  projectListFetchSuccess: (payload) => ({
    type: ActionConstants.USER.GETPROJECTLISTSUCCESS,
    payload
  }),
  projectListFetchFailure: (payload) => ({
    type: ActionConstants.USER.GETPROJECTLISTFAILURE,
    payload
  })
};

export default home_actions;