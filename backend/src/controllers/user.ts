import express, { Request, Response } from 'express';
import { login } from '../services/user';

//Middleware
import { authenticateToken, bodyCheck } from './middlewares/middleware';

//Services


const router = express.Router();

router.post('/login', [bodyCheck], async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send('Email and password are required');
    }
    const user = await login(email, password);
    if (!user) {
        res.status(404).json("User could not be found!");
    }
    else {
        res.status(200).json(user);
    };
})

export default router;