import { Router } from 'express';
const adminRouter = Router();

// middleware & controllers
import {admin}  from "../middleware/Admin.js";
import {getAllEducatorData , getAllLearnerData , deleteUser} from '../controllers/admin.js'


// routes
adminRouter.get('/get-all-educator-data', admin,  getAllEducatorData)
adminRouter.get('/get-all-learner-data', admin,  getAllLearnerData)
adminRouter.delete('/deleteUser', admin, deleteUser)

export default adminRouter;