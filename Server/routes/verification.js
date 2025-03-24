import { Router } from "express";
const verificationRouter = Router()

import { sendOTP ,verifyOTP} from '../controllers/verification.js'

verificationRouter.post('/sendOTP' , sendOTP);
verificationRouter.post('/verifyOTP' , verifyOTP);

export default verificationRouter