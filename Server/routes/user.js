import { Router } from "express";
import { registerLearnerController , registerEducatorController , signin , signout , updateUserDetails, registerAdminController, searchEducator, addtodos, fetchtodos, deletetodos, toggleTodoComplete, toggleTheme, getEducatorSessions, getLearnerSessions, WithdrawelRequest, } from "../controllers/user.js";
import { createZoomMeeting } from "../utils/createZoomMeeting.js";

const userRouter = Router();

userRouter.post('/register-learner',registerLearnerController);
userRouter.post('/register-educator',registerEducatorController);
userRouter.post('/register-admin', registerAdminController);
userRouter.post('/signin',signin);
userRouter.post('/signout',signout);
userRouter.patch('/updateUserDetails', updateUserDetails);
userRouter.get('/searchEducator', searchEducator);
userRouter.post('/addtodos', addtodos);
userRouter.get('/fetchtodos', fetchtodos);
userRouter.delete('/deletetodos', deletetodos);
userRouter.put('/toggleTodoComplete', toggleTodoComplete);
userRouter.post('/toggleTheme', toggleTheme);
userRouter.post('/createZoomMeeting', createZoomMeeting);
userRouter.get('/getEducatorSessions', getEducatorSessions);
userRouter.get('/getLearnerSessions', getLearnerSessions);
userRouter.post('/WithdrawelRequest', WithdrawelRequest);

export default userRouter