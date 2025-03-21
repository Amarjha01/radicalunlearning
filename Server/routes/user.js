import { Router } from "express";
import { registerLearnerController , registerEducatorController , signin , updateUserDetails, registerAdminController} from "../controllers/user.js";

const userRouter = Router();

userRouter.post('/register-learner',registerLearnerController);
userRouter.post('/register-educator',registerEducatorController);
userRouter.post('/register-admin', registerAdminController);
userRouter.post('/signin',signin);
userRouter.patch('/updateUserDetails', updateUserDetails)

export default userRouter