import { Router } from 'express';
const adminRouter = Router();

// middleware & controllers
import {admin}  from "../middleware/Admin.js";
import {getAllEducatorData , getAllLearnerData , deleteUser, approveEducator, getEducatorDataDetails, getWithdrawelRequests, suspendUser, getlearnerDataDetails} from '../controllers/admin.js'


// routes
adminRouter.post('/get-all-educator-data', admin,  getAllEducatorData)
adminRouter.post('/get-all-learner-data', admin,  getAllLearnerData)
adminRouter.delete('/deleteUser', admin, deleteUser);
adminRouter.patch('/approveEducator', admin, approveEducator);
adminRouter.post('/getEducatorDataDetails', admin, getEducatorDataDetails);
adminRouter.post('/getlearnerDataDetails', admin, getlearnerDataDetails);
adminRouter.get('/getWithdrawelRequests', admin, getWithdrawelRequests);
adminRouter.post('/suspendUser', admin, suspendUser);

export default adminRouter;