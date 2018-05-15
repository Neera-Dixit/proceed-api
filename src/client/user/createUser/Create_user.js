import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
// import '../../../utils/font.less';
import '../../common/common.less';
import Select from 'react-select';
import AppUtil from '../../common/appUtils';
import userActions from '../user_actions';

class CreateUser extends Component {
  constructor(props) {
    super(props);
  }

  addUser = (event) => {
    event.preventDefault();
    const name = this.name.value;
    const emailID = this.email.value;
    const contactNum = this.phone.value;
    const newUserType = this.userType.value;

    this.props.createuser_Actions.createUser({
      newUserType,
      name,
      emailID,
      contactNum
    });
  }

  render() {
    const _props = this.props.userState;
    const { sublevels } = AppUtil.getSubLevels();
    const userTypes = sublevels && sublevels.map(user => <option key={user.id} value={user.id}>{user.name}</option>);

    if (_props.userCreation &&  _props.userCreation.status) {
      return (
        <div>
        <button type="button" className="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Create User</button>
         <div className="modal fade" id="myModal" role="dialog">
           <div className="modal-dialog"> 
             <div className="modal-content">
               <div className="modal-header">
                 <button type="button" className="close" data-dismiss="modal">&times;</button>
                 <h4 className="modal-title">User Created Successfully</h4>
               </div>
               <div className="modal-footer">
                 <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
               </div>
             </div>            
           </div>
         </div>
     </div>
      )
    }

    return (
      <div>
         <button type="button" className="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Create User</button>
          <div className="modal fade" id="myModal" role="dialog">
            <div className="modal-dialog">
            
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal">&times;</button>
                  <h4 className="modal-title">User Details</h4>
                </div>
                <div className="modal-body">
                  <form onSubmit={this.addUser}>
                    <div className="form-group">
                      <label>Name:</label>
                      <input type="text" className="form-control" 
                        id="name"
                       placeholder="Enter name"  
                       name="name" 
                       ref = { name => this.name = name }
                      required/>
                    </div>
                    <div className="form-group">
                      <label>Email:</label>
                      <input type="email" 
                      className="form-control" 
                      id="email" 
                      placeholder="Enter email"  
                      name="email" 
                      ref = { email => this.email = email }
                      required/>
                    </div>
                    <div className="form-group">
                      <label >Phone Number:</label>
                      <input type="tel" 
                      className="form-control" 
                      id="pwd" 
                      placeholder="Enter phone number"  
                      name="phone" 
                      ref = { phone => this.phone = phone }
                      required/>
                    </div>
                    <div className="form-group">
                      <label>User Type:</label>
                      <select ref = { userType => this.userType = userType}>
                        {userTypes}
                      </select>
                    </div>
                    <button type="submit" className="btn btn-default">Submit</button>
                  </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                </div>
              </div>
              
            </div>
          </div>
      </div>
    );
  }
}


const mapStateToProps = state => ({ userState: state.userReducer });
const mapDispatchToProps = dispatch => ({ createuser_Actions: bindActionCreators(userActions, dispatch) });
export default connect(mapStateToProps, mapDispatchToProps)(CreateUser);