import Util from '../config/util';
import emailService from '../services/emailService';

const userController = {

  createUser: (request, response) => {
    const { userID, password, emailID } = request.payload;
    const { userType } = request.query;
    const _modelName = Util.getModelNameFromUserID(userType);
    const _User = request.collections(true)[_modelName];

    if (_modelName) {
      Util.encryptData(userType)
        .then((hashValue) => {

          const _payLoad = {
            _id: userID,
            password: hashValue,
            emailID
          };

          _User.create(_payLoad).exec((error, userData) => {
            if (!error && userData) {

              const _payload = {
                toEmailID: emailID,
                template: {
                  name: 'registration',
                  data: {
                    userID,
                    password
                  }
                }
              };

              emailService.sendEmail(_payload)
                .then((status) => {
                  Util.sendResponse(response, null, userData);
                })
                .catch((err) => Util.sendResponse(response, 'Failed to Send Email to User'))
            } else {
              Util.sendResponse(response, 'Failed to create User');
            }
          });
        })
        .catch((err) => Util.sendResponse(response, 'Failed to create User'));
    } else {
      Util.sendResponse(response, 'Failed to create User');
    }

  },

  getUsers: (request, response) => {
    const User = request.collections(true).user;
    console.log("entered!!!")
    User.find().exec((err, userList) => {
      Util.sendResponse(response, err, userList);
    });
  },

  getUserById: (request, response) => {
    const User = request.collections(true).user;

    User.findOne(request.params).exec((err, userData) => {
      Util.sendResponse(response, err, userData);
    });
  },

  deleteUser: (request, response) => {
    const User = request.collections(true).user;

    User.destroy({ userID: request.params.userID }).exec((err, deletedUser) => {
      Util.sendResponse(response, err, deletedUser);
    });
  },

  updateUser: (request, response) => {
    const User = request.collections(true).user;

    User.update(request.params, request.payload).exec((err, updatedUser) => {
      Util.sendResponse(response, err, updatedUser);
    });
  }

};

export default userController;