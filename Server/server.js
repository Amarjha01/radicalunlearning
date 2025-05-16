// 1. Core imports
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import cookieParser from 'cookie-parser';
dotenv.config();

// 2. Import your routes
import DataBaseConfig from './config/dataBase/DataBaseConfig.js';
import userRouter from './routes/user.js';
import adminRouter from './routes/admin.js';
import verificationRouter from './routes/verification.js';
import paymentRouter from './routes/paymentGateway.js';
import aiRouter from './routes/aiRouter.js';
import mailRouter from './routes/mail.js';
import { handleStripeWebhook } from './controllers/paymentGateway.js';
// 3. App and Server creation
const app = express();


app.use(cookieParser());

// 4. Middleware
app.use(cors({
  credentials: true,
  origin: ["http://localhost:5173", "http://localhost:4173", "https://dev.radical-unlearning.com"]
}));
app.post('/api/pay/webhook', express.raw({ type: 'application/json' }), handleStripeWebhook);

app.use(express.json());
// 5. Routes
app.use('/api/pay', paymentRouter);
app.use('/api/user', userRouter);
app.use('/api/admin', adminRouter);
app.use('/api/verify', verificationRouter);
app.use('/api/ai', aiRouter);
app.use('/api/mail', mailRouter )


// 7. Database connection and server start
const PORT = process.env.PORT || 30001;

DataBaseConfig().then(() => {
  app.listen(PORT, '0.0.0.0', () => {
    console.log('Server running on port:', PORT);
  });
});
