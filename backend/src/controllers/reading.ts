import express, { Request, Response } from 'express';
import { authenticateToken, authorize } from './middlewares/middleware';

const router = express.Router();

router.get('/', [authenticateToken], async (req: Request, res: Response) => {

});

//Add new data reading
router.post('/', [authenticateToken, authorize['labTech']], async (req: Request, res: Response) => {

});


//Edit data reading
router.post('/', [authenticateToken, authorize['doctor']], async (req: Request, res: Response) => {

});

export default router;
