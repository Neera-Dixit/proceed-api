import constants from './constants';
import localstroragefetch from 'local-storage-fetch';

const appUtils = {
  storeDataIntoLocalstorage: (key,data) => {
    localstroragefetch.setData(key,data);
  },
  getLocalStorageData: (key) => {
    return localstroragefetch.getData(key);
  },
  getHeaderTokenValue: () => {
    return localstroragefetch.getData('token');
  },
  getSubLevels: () => {
    const usertype = localstroragefetch.getData('userType');
    return usertype && constants.userCreation[usertype];
  }
};

export default appUtils;