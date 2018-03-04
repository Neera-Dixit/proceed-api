import Constants from './constants';
import JWT from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const util = {

  sendResponse: (response, error, data) => {
    if (error) return response({ error }).code(500);

    if (!data || (Array.isArray(data) && data.length === 0)) {
      return response({ data: [] }).code(404);
    }
    return response(data).code(200);
  },

  payLoadValidation: (payloadParam) => {
    return (val, options, next) => {
      const payload = options.context.payload;

      for (let value of payloadParam) {
        if (!(value in payload)) {
          let err = new Error('Invalid type');
          next(err, val);
        }
      }
      next(null, val);
    };
  },

  getModelNameFromUserID: (userID) => {
    const modelNameMap = {
      contr_: 'user_contractors',
      aeng_: 'user_aes',
      aee_: 'user_aees',
      account_: 'user_accountants',
      ee_: 'user_ees'
    }

    for (let key in modelNameMap) {
      if (userID.indexOf(key) === 0) {
        return modelNameMap[key];
      }
    }

    return false;
  },

  generateJWT: (payload, expiryTime) => {
    const JWTtoken = JWT.sign(payload, Constants.JWT_SECRET, { expiresIn: expiryTime || 60 });
    return JWTtoken;
  },

  encryptData: (data) => {
    return bcrypt.hash(data, 10)
  },

  compareEncryptedData: (dataOne, dataTwo) => {
    return bcrypt.compare(dataOne, dataTwo);
  }
}

export default util;