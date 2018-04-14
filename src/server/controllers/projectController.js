import Util from '../config/util';

const generateProjectID = ({name:prefixID}) => {
  return Util.generateUniqueID({prefixID});
};

const generateUpdateQueryObj = (objKeys, payload) => {
  const _query = {};

  if (!objKeys || !payload) {
    return _query;
  }

  for(var key of objKeys) {
    if(payload[key]) {
      _query[key] = payload[key];
    }
  }
  return _query;
};

const projectController = {

  createProject: (request, response) => {
    const { headers } = request;
    const _Project = request.collections(true)['projectdetails'];
    const {name, description} = request.payload;
    const _payload = {
      _id: generateProjectID({name: name.replace(/ /g,'')}),
      name,
      description,
      createdBy: headers.userID
    };

    _Project.create(_payload).exec((err, projectData) => {
      if(err || !projectData) {
       return Util.sendResponse(response, "Failed to create Project");
      }
      Util.sendResponse(response, null, projectData);
    })
  },

  updateProject: (request, response) => {
    const projID = request.params.id;
    const {name,description} = request.payload;
    const _findQuery = {
      _id: projID
    };

    const  _updateQuery = generateUpdateQueryObj(['name', 'description'], request.payload);
    const _Project = request.collections(true)['projectdetails'];

    _Project.update(_findQuery).set(_updateQuery).exec((err, projectData) => {
      if(err || !projectData) {
       return Util.sendResponse(response, `Project with ID ${projID} not found`);
      }
      Util.sendResponse(response, null, projectData);
    });
  },

  getProjectDetails: (request, response) => {
    const { projectID, userID } = request.query;

    if (projectID) {
      projectController.getProjectDetailsByProjectID(request, response, projectID);
    } else if(userID) {
      projectController.getProjectDetailsByUserID(request, response, userID);
    } else {
      Util.sendResponse(response, "Project Not Found");
    }
  },

  getProjectDetailsByProjectID: (request, response, projectID) => {
    const _query = {
      _id: projectID
    };
    
    const _Project = request.collections(true)['projectdetails'];
    _Project.findOne(_query).exec((err, projectData) => {
      if(err || !projectData) {
        return Util.sendResponse(response, `Project with ID ${projectID} not found`);
      }
      Util.sendResponse(response, null, projectData);
    });
  },

  getProjectDetailsByUserID: (request, response, userID) => {
    const _query = {
      createdBy: userID
    };
    
    const _Project = request.collections(true)['projectdetails'];
    _Project.findOne(_query).exec((err, projectData) => {
      if(err || !projectData) {
        return Util.sendResponse(response, `Project with ID ${projID} not found`);
      }
      Util.sendResponse(response, null, projectData);
    });
  }
};

export default projectController;