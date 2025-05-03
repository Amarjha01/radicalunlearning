import express from 'express';
import { askAI } from '../controllers/aiController.js';

const aiRouter = express.Router();
aiRouter.post('/ask-ai', askAI);

export default aiRouter;
