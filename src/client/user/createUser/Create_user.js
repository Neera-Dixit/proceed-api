import React from 'react';
import { Link } from 'react-router-dom';
// import '../../../utils/font.less';
import '../../common/common.less';
import Select from 'react-select';

export default class CreateUser extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      userTypes:[{
        "label":"Contractor",
        "value":"contractor"
      },
      {
        "label":"Associate Engineer",
        "value":"associate_engineer"
      },
      {
        "label":"Associate Executive Engineer",
        "value":"associate_exec_engineer"
      },
      {
        "label":"Accountant",
        "value":"account"
      },
      {
        "label":"Executive Engineer",
        "value":"executive_engineer"
      }],
      selectedUser:{}
    };
  }

  inputChange=(name, event)=> {
    const stateObj = {};
      stateObj[name] = event.target.value;
      this.setState(stateObj);
  }
  addUser=()=>{
    console.log(this.state);
    const data={
      "userID":"aee_10",
      "name":this.state.name,
      "email":this.state.email,
      "phone":this.state.phone
    };
    this.props.addUser(data);
  }

  setUserType=(user)=>{
    // let categoryViews = this.state.categoryViews.slice();
    // categoryViews[categoryViewIndex].value = category.value;
    // this.setState({
    //   categoryViews
    // });
    console.log(user);
    this.setState({
      selectedUser:user
    });
  }

  render() {
    const Select = require('react-select');
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
                  <form>
                    <div className="form-group">
                      <label>Name:</label>
                      <input type="text" className="form-control" id="email" placeholder="Enter name"  onChange={this.inputChange.bind(self, 'name')} name="name"/>
                    </div>
                    <div className="form-group">
                      <label>Email:</label>
                      <input type="email" className="form-control" id="email" placeholder="Enter email"  onChange={this.inputChange.bind(self, 'email')} name="email"/>
                    </div>
                    <div className="form-group">
                      <label >Phone Number:</label>
                      <input type="tel" className="form-control" id="pwd" placeholder="Enter phone number"  onChange={this.inputChange.bind(self, 'phone')} name="phone"/>
                    </div>
                    <div className="form-group">
                      <label>User Type:</label>
                      {/* <Select
                        name="form-field-name"
                        value='abc'
                        options={this.state.userTypes}
                        onChange={(user)=>this.setUserType(user)}
                        clearable={false}
                      /> */}
                    </div>
                    <button type="submit" className="btn btn-default" onClick={this.addUser}>Submit</button>
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
  componentDidMount(){
    setTimeout(()=>{
      console.log("yess");
    },1000);
  }
}
