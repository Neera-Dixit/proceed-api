const user_ae= {
	identity: 'user_aes',
	migrate: 'safe',
  connection: 'mongoDB',
  projects: {
    collection: 'projectdetails',
    via: 'createdBy'
  },
};

export default user_ae;