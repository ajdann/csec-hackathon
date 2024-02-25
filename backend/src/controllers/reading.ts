import express, { Request, Response } from 'express';
import { authenticateToken, authorizeLabTechnician, authorizeDoctor } from './middlewares/middleware';

const router = express.Router();

router.get('/', [authenticateToken], async (req: Request, res: Response) => {

});

//Add new data reading
router.post('/', [authenticateToken, authorizeLabTechnician], async (req: Request, res: Response) => {

});


//Edit data reading
router.post('/', [authenticateToken, authorizeDoctor], async (req: Request, res: Response) => {

});

export default router;
