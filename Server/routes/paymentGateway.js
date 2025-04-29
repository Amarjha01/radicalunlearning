import { Router } from "express";
import express from 'express'
import { createCheckoutSession, handleStripeWebhook } from "../controllers/paymentGateway.js";

const paymentRouter = Router()

paymentRouter.post('/createCheckoutSession', express.json() ,  createCheckoutSession )
paymentRouter.post('/webhook', express.raw({ type: 'application/json' }),  handleStripeWebhook )


export default paymentRouter