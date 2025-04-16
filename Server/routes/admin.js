import { Router } from 'express';
const adminRouter = Router();

// middleware & controllers
import {admin}  from "../middleware/Admin.js";
import {getAllEducatorData , getAllLearnerData , deleteUser, approveEducator} from '../controllers/admin.js'


// routes
adminRouter.post('/get-all-educator-data', admin,  getAllEducatorData)
adminRouter.post('/get-all-learner-data', admin,  getAllLearnerData)
adminRouter.delete('/deleteUser', admin, deleteUser);
adminRouter.patch('/approveEducator', admin, approveEducator);

export default adminRouter;