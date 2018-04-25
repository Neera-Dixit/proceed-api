import ACTION from '../common/action_constants';

function user(state = {}, action) {
    let tempState = Object.assign({}, state);
    if (action.type === ACTION.USER.STOREUSER) {
        tempState.load = true;
        return tempState;
    }
    return state;
}
export default user;
