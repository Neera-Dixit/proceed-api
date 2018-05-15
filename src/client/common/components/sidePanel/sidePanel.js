import React from 'react';
import {connect} from 'react-redux';
import ACTION from '../../action_constants';
import {Link} from 'react-router-dom';
import './sidePanel.less';
import CreateUser from '../../../user/createUser/Create_user';

class SidePanel extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
      const {projectList} = this.props;
      const projlistMap = projectList && projectList.map(project => <div className="menu-item" key={project.id}>{project.name}</div>)

        return (
            <div className="side-bar-root">
                <div className="menu">
                    <div className="options"><button className="btn btn-info btn-lg"> Create Project</button></div>
                    <div className="options"><CreateUser/></div>                
                </div>
                <div>
                    <div className="menu-item">My Projects</div>
                    { projlistMap ? projlistMap : <label>No Projects</label> }
                </div>
            </div>
        );
    }
    componentDidMount() {
    }
}

// const mapStateToProps = state => {
//     return {home: state.home};
// };

// export default connect(mapStateToProps)(Home);
export default SidePanel;