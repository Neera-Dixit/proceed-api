const api_config = {
    authenticateUser: {
      HTTPMethod: 'POST',
      url: '/api/authenticateUser'
    },
    createUser: {
      HTTPMethod: 'POST',
      url: '/api/createUser',
    },
    createProject: {
      HTTPMethod: 'POST',
      url: '/api/createProject'
    },
    updateProject: {
      HTTPMethod: 'PATCH',
      url: '/api/updateProject/'
    },  // /projectid
    projectDetails: {
      HTTPMethod: 'GET',
      url: '/api/projectDetails'
    },
};
export default api_config;
