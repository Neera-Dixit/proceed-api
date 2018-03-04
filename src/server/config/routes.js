import userController from '../controllers/userController';
import authController from '../controllers/authController';
import Util from './util';

const customMiddleware = (val, options, next) => {
  console.log("customMiddleware enetered");
  next(null, val);
};

const routes = {
  config: [

    // Add main app route
    { method: 'GET', path: '/{param*}', config: { handler: { view: 'index' } } },

    {
      method: 'POST', path: '/authenticateUser',
      config: {
        validate: { params: Util.payLoadValidation(['userID', 'password']) },
        handler: authController.validateUser
      }
    },

    {
      method: 'POST', path: '/createUser',
      config: {
        validate: { params: Util.payLoadValidation(['userID', 'password', 'emailID']) },
        handler: userController.createUser
      }
    }
  ]
};

export default routes;