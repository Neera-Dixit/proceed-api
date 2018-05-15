import React from 'react';
import {connect} from 'react-redux';
import ACTION from '../common/action_constants';
import { Link } from 'react-router-dom';
import JsonView from '../common/components/JsonView';
import SidePanel from '../common/components/sidePanel/sidePanel';
import { bindActionCreators } from 'redux';
import homeActions from './home_actions';
import APPUtil from '../common/appUtils';
import '../common/common.less';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {homeState} = this.props;

    return (
      <div>
        <SidePanel projectList={homeState.projectList} />
        <div className="content-root">
            Home Page !!!
        </div>
      </div>
    );
  }

  componentDidMount() {
    const userID = APPUtil.getLocalStorageData('id');
    this.props.home_Actions.getUserProjectList({
      userID,
    });
  }
}

const mapStateToProps = state => ({ homeState: state.homeReducer });
const mapDispatchToProps = dispatch => ({ home_Actions: bindActionCreators(homeActions, dispatch) });
export default connect(mapStateToProps, mapDispatchToProps)(Home);