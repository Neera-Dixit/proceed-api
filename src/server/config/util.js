import Constants from './constants';
import JWT from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import passwordGenerator from 'generate-password';
import shortid from 'shortid';

const util = {

  sendResponse: (response, error, data) => {
    if (error) return response({ error }).code(500);

    if (!data || (Array.isArray(data) && data.length === 0)) {
      return response({ data: [] }).code(404);
    }
    return response(data).code(200);
  },

  requestHeaderValidation: () => {
    return (val, options, next) => {
      const tokenvalue = val.authorization && util.getHeaderAuthTokenValue(val.authorization);

      if(!tokenvalue) {
        return next(new Error('Missing token'), null);
      }

      util.validateJWT(tokenvalue)
        .then(decodedToken => next(null, decodedToken))
        .catch(err => next(err, null))
    };
  },

  getHeaderAuthTokenValue: (authToken) => {
    return authToken && authToken.slice(7, authToken.length);
  },

  payLoadValidation: (payloadParam) => {
    return (payload, options, next) => {
      for (let value of payloadParam) {
        if (!(value in payload)) {
          let err = new Error('Invalid type');
          return next(err, payload);
        }
      }
      next(null, payload);
    };
  },

  validateQueryParams : () => {
    return (params, options, next) => {
      console.log("params ",params);
      console.log("options ",options);
      next(null, "data");
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
    const JWTtoken = JWT.sign(payload, Constants.JWT_SECRET, { expiresIn: expiryTime || '10d' });
    return JWTtoken;
  },

  validateJWT: (token) => {
    return new Promise((resolve, reject) => {
      JWT.verify(token, Constants.JWT_SECRET, (error, decoded) => {
        if (error) {
          reject(error);
        }
        resolve(decoded);
      })
    });
  },

  encryptData: (data) => {
    return bcrypt.hash(data, 10)
  },

  compareEncryptedData: (dataOne, dataTwo) => {
    return bcrypt.compare(dataOne, dataTwo);
  },

  generatePassword: ({userType}) => {
    return userType.concat(passwordGenerator.generate({
      length: 6,
      numbers: true,
      symbols: true,
      uppercase: true
    }));
  },

  generateUniqueID: ({prefixID}) => {
    return prefixID.concat(shortid.generate());
  }

}

export default util;