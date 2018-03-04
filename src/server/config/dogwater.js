import MongoSails from 'sails-mongo';
import dbConfig from './database';
import Models from '../models/index';

const dogwaterOptions = {
	connections: {
    	mongoDB: dbConfig.mongodb
  	},
  	adapters: {
    	mongodb: MongoSails
  	},
  	models: Models
};

export default dogwaterOptions;