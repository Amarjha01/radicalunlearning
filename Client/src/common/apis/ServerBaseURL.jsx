// const backendDomain = "http://localhost:3000";
const backendDomain = "api.radical-unlearning.com";

const API = {
  registerLearner: { 
    url: `${backendDomain}/api/user/register-learner`,
    method: 'POST',
  },
  registerEducator: { 
    url: `${backendDomain}/api/user/register-educator`,
    method: 'POST',
  },
  signIn: { 
    url: `${backendDomain}/api/user/signin`,
    method: 'POST',
  },
  // APIs for Admin dashboard 

  educatorsData: { 
    url: `${backendDomain}/api/admin/get-all-educator-data`,
    method: 'POST',
  },
  learnersData: { 
    url: `${backendDomain}/api/admin/get-all-learner-data`,
    method: 'POST',
  },
  approveEducator: { 
    url: `${backendDomain}/api/admin/approveEducator`,
    method: 'POST',
  },
  deleteUser: { 
    url: `${backendDomain}/api/admin/deleteUser`,
    method: 'POST',
  },
};

export default API;
