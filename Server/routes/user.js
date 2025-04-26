import { Router } from "express";
import { registerLearnerController , registerEducatorController , signin , updateUserDetails, registerAdminController, searchEducator, addtodos} from "../controllers/user.js";

const userRouter = Router();

userRouter.post('/register-learner',registerLearnerController);
userRouter.post('/register-educator',registerEducatorController);
userRouter.post('/register-admin', registerAdminController);
userRouter.post('/signin',signin);
userRouter.patch('/updateUserDetails', updateUserDetails);
userRouter.get('/searchEducator', searchEducator);
userRouter.post('/addtodos', addtodos);

export default userRouter