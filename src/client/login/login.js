import React from 'react';
import _ from 'lodash';
// import '../../utils/font.less';
// import HTTPClient from '../utils/httpclient';
import APIConfig from '../common/api_config';
import './login.less';
import NavPanel from '../common/components/navPanel/navPanel';
import { bindActionCreators } from 'redux';
import loginActions from './login_actions';
import { connect } from 'react-redux';
import AppUtil from '../common/appUtils';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {loginStatus: ''}
  }

  validateUser = async (event) => {
    event.preventDefault();

    const bodyParam = {
      userID: this.username.value,
      password: this.password.value
    };

    const { HTTPMethod, url } = APIConfig.authenticateUser;

    this.props.login_Actions.authenticateUser(bodyParam)
  }

  userInvalidHandler = () => {
    return 'Invalids User, Please try again';
  }

  userValidHandler = (loginstatusData) => {
    _.forEach(loginstatusData, (value, key) => {
      AppUtil.storeDataIntoLocalstorage(key, value);
    });
    this.props.history.push('/home');
    return null;
  }

  render() {
    const {loginState} = this.props;
    const {loginStatus, loginstatusData} = loginState;
    let loginMsg = null;

    if (loginStatus === 'success') {
      loginMsg = this.userValidHandler(loginstatusData);
    } else if (loginStatus === 'failure') {
      loginMsg = this.userInvalidHandler();
    }

    return (
      <div className = "login-wrap">
       <NavPanel/>
       <form onSubmit={this.validateUser}>
        <div className = "wrapper">
          <div className = "login-section">
            <div className = "center">
            <div className = "input-section">
              <div>
              User Name
              </div>
              <div className = "input">
              <input type = "text" className="input-class" ref={username => this.username = username} required/>
              </div>
            </div>
            <div className = "input-section">
              <div>
              Password
              </div>
              <div className = "input">
              <input type = "password" className="input-class" ref={password => this.password = password} required/>
              </div>
            </div>
            <div className = "input-section">
              <input type = "submit" value = "Login" className="button-class"/>
            </div>
            <div>
              <label>{loginMsg}</label>
            </div>
            </div>
          </div>
        </div>
       </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({ loginState: state.loginReducer });
const mapDispatchtoProps = dispatch => ({ login_Actions:  bindActionCreators(loginActions, dispatch) });
export default connect(mapStateToProps, mapDispatchtoProps)(Login); //mapDispatchtoProps