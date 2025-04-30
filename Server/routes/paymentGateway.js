import { Router } from "express";
import express from 'express'
import { createCheckoutSession, finalizeSessionAfterPayment, handleStripeWebhook } from "../controllers/paymentGateway.js";

const paymentRouter = Router()

paymentRouter.post('/createCheckoutSession', express.json() ,  createCheckoutSession );
paymentRouter.post('/finalizesession', express.json() ,  finalizeSessionAfterPayment );
paymentRouter.post('/webhook', express.raw({ type: 'application/json' }),  handleStripeWebhook )


export default paymentRouter