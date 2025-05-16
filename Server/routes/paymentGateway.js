import { Router } from "express";
import express from 'express'
import { createCheckoutSession, finalizeSessionAfterPayment} from "../controllers/paymentGateway.js";

const paymentRouter = Router()

paymentRouter.post('/createCheckoutSession', express.json() ,  createCheckoutSession );
paymentRouter.post('/finalizesession', express.json() ,  finalizeSessionAfterPayment );


export default paymentRouter