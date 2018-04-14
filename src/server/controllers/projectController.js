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
        Util.sendResponse(response, "Failed to create Project");
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
        Util.sendResponse(response, `Project with ID ${projID} not found`);
      }
      Util.sendResponse(response, null, projectData);
    });
  },

  getProjectDetails: (request, response) => {
    const projID = request.params.id;

    const _query = {
      _id: projID
    };
    
    const _Project = request.collections(true)['projectdetails'];
    _Project.findOne(_query).exec((err, projectData) => {
      if(err || !projectData) {
        Util.sendResponse(response, `Project with ID ${projID} not found`);
      }
      Util.sendResponse(response, null, projectData);
    });
  }
};

export default projectController;