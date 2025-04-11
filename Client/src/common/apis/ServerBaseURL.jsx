const backendDomain = "http://localhost:3000";

const API = {
  registerLearner: { 
    url: `${backendDomain}/api/user/register-learner`,
    method: 'POST',
  },
  signIn: { 
    url: `${backendDomain}/api/signin`,
    method: 'POST',
  },
};

export default API;
