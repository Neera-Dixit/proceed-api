import React from 'react';
//  import '../../utils/font.less';
import './login.less';
import NavPanel from '../common/components/navPanel/navPanel';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className = "login-wrap">
       <NavPanel/>
       <div className = "wrapper">
        <div className = "login-section">
          <div className = "center">
          <div className = "input-section">
            <div className = "label">
            User Name
            </div>
            <div className = "input">
            <input type = "text" className="input-class"/>
            </div>
          </div>
          <div className = "input-section">
            <div className = "label">
             Password
            </div>
            <div className = "input">
            <input type = "password" className="input-class"/>
            </div>
          </div>
          <div className = "input-section">
            <input type = "button" value = "Login" className="button-class"/>
          </div>
          </div>
        </div>
       </div>
      </div>
    );
  }
  componentDidMount(){

  }
}
