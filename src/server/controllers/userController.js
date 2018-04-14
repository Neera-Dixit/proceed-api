import Util from '../config/util';
import emailService from '../services/emailService';

const generateUserID = ({newUserType:prefixID}) => {
  return Util.generateUniqueID({prefixID});
};

const generatePassword = ({newUserType:userType}) => {
  return Util.generatePassword({userType});
};

const userController = {

  createUser: (request, response) => {
    const { parentUserType, newUserType, name, emailID, contactNum } = request.payload;
    const _modelName = Util.getModelNameFromUserID(newUserType);
    const _User = request.collections(true)[_modelName];

    if (_modelName) {
      const _password = generatePassword({newUserType})
      Util.encryptData(_password)
        .then((hashValue) => {

          const _userID = generateUserID({newUserType});

          const _payLoad = {
            _id: _userID,
            password: hashValue,
            emailID,
            contactNum,
            name,
            userType: newUserType,
          };

          _User.create(_payLoad).exec((error, userData) => {
            if (!error && userData) {

              const _payload = {
                toEmailID: emailID,
                template: {
                  name: 'registration',
                  data: {
                    userID: _userID,
                    password: _password
                  }
                }
              };

              emailService.sendEmail(_payload)
                .then((status) => {
                  Util.sendResponse(response, null, {message : `User ${_userID} created successfully`});
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