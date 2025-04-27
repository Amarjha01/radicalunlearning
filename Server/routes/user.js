import { Router } from "express";
import { registerLearnerController , registerEducatorController , signin , updateUserDetails, registerAdminController, searchEducator, addtodos, fetchtodos, deletetodos, toggleTodoComplete, toggleTheme } from "../controllers/user.js";

const userRouter = Router();

userRouter.post('/register-learner',registerLearnerController);
userRouter.post('/register-educator',registerEducatorController);
userRouter.post('/register-admin', registerAdminController);
userRouter.post('/signin',signin);
userRouter.patch('/updateUserDetails', updateUserDetails);
userRouter.get('/searchEducator', searchEducator);
userRouter.post('/addtodos', addtodos);
userRouter.get('/fetchtodos', fetchtodos);
userRouter.delete('/deletetodos', deletetodos);
userRouter.put('/toggleTodoComplete', toggleTodoComplete);
userRouter.post('/toggleTheme', toggleTheme);

export default userRouter