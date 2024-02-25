import express, { Request, Response } from 'express';

//Middleware
import { authenticateToken, emptyBodyCheck } from './middlewares/middleware';

//Services


const router = express.Router();

router.post('/login', [emptyBodyCheck], async (req: Request, res: Response) => {
    const data = null; //await login(req.body as IUserLogin);
    if (!data) {
        res.status(404).json("User could not be found!");
    }
    else {
        res.status(200).json(data);
    };
})

export default router;