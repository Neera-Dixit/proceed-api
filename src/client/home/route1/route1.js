import React from 'react';
import {connect} from 'react-redux';
import ACTION from '../../common/action_constants';
import { Link } from 'react-router-dom';
import JsonView from '../../common/components/JsonView';
import SidePanel from '../../common/components/sidePanel/sidePanel';
import '../../common/common.less';
import CsvImport from './csvImport';

class Route1 extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <SidePanel/>
        <div className="content-root">You are on the Route1 page.. 
          <CsvImport/>

        </div>
      </div>
    );
  }
  componentDidMount() {
    const {dispatch} = this.props;
  }
}

const mapStateToProps = state => {
  return {
    route1Reducer: state.route1Reducer
  };
};

export default connect(mapStateToProps)(Route1);