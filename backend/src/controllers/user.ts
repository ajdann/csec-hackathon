import express, { Request, Response } from 'express';

//Middleware
import { authenticateToken, emptyBodyCheck } from './middlewares/middleware';

//Services


const router = express.Router();


export default router;