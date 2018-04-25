import React from 'react';
import { Link } from 'react-router-dom';
import './navPanel.less';

export default class NavPanel extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className = "nav-panel-wrap">
        <div className = "wrapper">
          <div className = "title">
            ProSeed
          </div>
        </div>
      </div>
    );
  }
  componentDidMount(){

  }
}
