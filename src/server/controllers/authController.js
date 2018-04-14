import Util from '../config/util';

const authController = {
  validateUser: (request, response) => {
    const { userID, password } = request.payload;

    const _modelName = Util.getModelNameFromUserID(userID);

    if (_modelName) {
      const _User = request.collections(true)[_modelName];
      const payload = { _id: userID };
      _User.findOne(payload).exec((error, userData) => { 
        if (!error && userData) {
          Util.compareEncryptedData(password, userData.password)
            .then((status) => {
              if(status) {
                const {emailID, contactNum, userType, id } = userData;
                const _jwtToken = Util.generateJWT(request.payload);
                Util.sendResponse(response, null, { 
                  token: _jwtToken,
                  emailID,
                  contactNum,
                  userType,
                  id
                });
              }
              else {
                Util.sendResponse(response, 'Invalid User');
              }
            })
            .catch((err) => Util.sendResponse(response, 'Invalid User'))
        } else {
          Util.sendResponse(response, 'Invalid User');
        }
      });
    } else {
      Util.sendResponse(response, 'Invalid User');
    }

  }
}

export default authController;