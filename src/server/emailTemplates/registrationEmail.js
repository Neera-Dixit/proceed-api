const regEmail = (params) => {
  const { userID, password } = params;
  const template = `<h1> Welcome to Proceed!!</h1><h1> USER ID :  ${userID}</h1><h1>Password : ${password}</h1>`
  return template
};

export default regEmail;