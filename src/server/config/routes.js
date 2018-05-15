import userController from '../controllers/userController';
import authController from '../controllers/authController';
import projectController from '../controllers/projectController';
import Util from './util';
import path from 'path';

const homePageHandler = (request, response) => {
  console.log("entered !!");
  response.file(path.join(__dirname, '../../assets/template/index.html'));
};

const customMiddleware = (val, options, next) => {
  console.log("customMiddleware enetered");
  next(null, val);
};

const routes = {
  config: [

    // Add main app route
    { method: 'GET', path: '/{param*}', config: { handler: { view: 'index' } } }, //{ view: 'index' }

    { 
      method: 'GET', path: '/assets/{param*}', 
      config: { 
        handler: { 
          directory: { path: path.join(__dirname, '../../../dist') } 
        },
      },
    },
    // Start of User Routes

    {
      method: 'POST', path: '/api/authenticateUser',
      config: {
        validate: { 
          payload: Util.payLoadValidation(['userID', 'password']),
        },
        handler: authController.validateUser
      }
    },

    {
      method: 'POST', path: '/api/createUser',
      config: {
        validate: { 
          payload: Util.payLoadValidation(['newUserType', 'name', 'emailID', 'contactNum' ]),
          headers: Util.requestHeaderValidation()
        },
        handler: userController.createUser
      }
    },

    // End of User Routes

    // Start of Project Routes
    {
      method: 'POST', path: '/api/createProject',
      config: {
        validate: { 
         payload: Util.payLoadValidation(['name', 'description' ]),
          headers: Util.requestHeaderValidation()
        },
        handler: projectController.createProject
      }
    },

    {
      method: 'PATCH', path: '/api/updateProject/{id}',
      config: {
        validate: { 
          headers: Util.requestHeaderValidation()
        },
        handler: projectController.updateProject
      }
    },

    {
      method: 'GET', path: '/api/projectDetails',
      config: {
        validate: { 
          headers: Util.requestHeaderValidation()
        },
        handler: projectController.getProjectDetails
      }
    },

    // End of Project Routes
  ]
};

export default routes;