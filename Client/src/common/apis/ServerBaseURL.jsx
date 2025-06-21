const backendDomain = "http://localhost:3000";
// const backendDomain = "https://api.radical-unlearning.com";

const API = {

  // -----------------APIs for all role---------------------------------
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
  signout: { 
    url: `${backendDomain}/api/user/signout`,
    method: 'POST',
  },
  updateUserDetails: { 
    url: `${backendDomain}/api/user/updateUserDetails`,
  },

  // ------------------------APIs for Admin dashboard---------------------------
  educatorsData: { 
    url: `${backendDomain}/api/admin/get-all-educator-data`,
    method: 'POST',
  },
  educatorsDetailedData: { 
    url: `${backendDomain}/api/admin/getEducatorDataDetails`,
    method: 'POST',
  },
  getlearnerDataDetails: { 
    url: `${backendDomain}/api/admin/getlearnerDataDetails`,
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
  suspendUser: { 
    url: `${backendDomain}/api/admin/suspendUser`,
    method: 'POST',
  },
  fetchWithdrawelRequests: { 
    url: `${backendDomain}/api/admin/getWithdrawelRequests`,
  },
  processWithdrawRequest: { 
    url: `${backendDomain}/api/admin/processWithdrawRequest`,
  },

  // --------------------APIs for learner------------------
  searchEducator:{
    url: `${backendDomain}/api/user/searchEducator`,
  },
  addtodos:{
    url: `${backendDomain}/api/user/addtodos`,
  },
  fetchtodos:{
    url: `${backendDomain}/api/user/fetchtodos`,
  },
  deletetodos:{
    url: `${backendDomain}/api/user/deletetodos`,
  },
  toggleTodoComplete:{
    url: `${backendDomain}/api/user/toggleTodoComplete`,
  },
  toggleTheme:{
    url: `${backendDomain}/api/user/toggleTheme`,
  },
  getLearnerSessions:{
    url: `${backendDomain}/api/user/getLearnerSessions`,
  },

  // --------------------APIs for educator------------------
  getEducatorSessions:{
    url: `${backendDomain}/api/user/getEducatorSessions`,
  },
  WithdrawelRequest:{
    url: `${backendDomain}/api/user/WithdrawelRequest`,
  },
  fetchWalletAmount:{
    url: `${backendDomain}/api/user/fetchWalletAmount`,
  },


  // -------------payment------------------------
  createCheckoutSession:{
    url: `${backendDomain}/api/pay/createCheckoutSession`,
  },
  finalizesession:{
    url: `${backendDomain}/api/pay/finalizesession`,
  },
  

  // ----------------AI-CHATBOAT-------------------------
  askai:{
    url: `${backendDomain}/api/ai/ask-ai`,
  },

  // ----------------mail--------------------------------------
  querymail:{
    url: `${backendDomain}/api/mail/querymail`
  }
};

export default API;
