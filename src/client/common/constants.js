const constants = {
  userCreation: {
    aeng_: {
      name : 'AE',
      sublevels: [
        {
          name: 'Contractor',
          id: 'contr_',
        },
      ]
    },
    contr_: {
      name : 'Contractor',
      sublevels: [],
    },
    aee_: {
      name : 'AEE',
      sublevels: [
        {
          name: 'AE',
          id: 'aeng_',
        },
        {
          name: 'Contractor',
          id: 'contr_',
        }
      ]
    },
    account_: {
      name: 'Account',
      sublevels : {
      
      },
    },
    ee_: {
      name: 'EE',
      sublevels: {

      }
    }
  }
};

export default constants;