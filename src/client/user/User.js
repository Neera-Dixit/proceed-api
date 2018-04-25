import React from 'react';
import { Link } from 'react-router-dom';
// import '../../utils/font.less';
import {connect} from 'react-redux';
import SidePanel from '../common/components/sidePanel/sidePanel';
import '../common/common.less';
import ACTION from '../common/action_constants';
import CreateUser from './createUser/Create_user';

class User extends React.Component {
  constructor(props) {
    super(props);
  }
  addUser=(data)=>{
    console.log(data);
    const {dispatch} = this.props;
    dispatch({type : ACTION.USER.CREATEUSER, data : data});
  }

  render() {
    return (
      <div>
        < SidePanel/>
        <div className = "content-root title">Create User Page
          <CreateUser addUser={this.addUser}/>
        </div>        
      </div>
    );
  }
  componentDidMount(){
    setTimeout(()=>{
      console.log("yess");
    },1000);
  }
}

const mapStateToProps = state => {
  return {user: state.user};
};

export default connect(mapStateToProps)(User);