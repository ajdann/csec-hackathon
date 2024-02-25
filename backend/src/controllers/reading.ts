import express, { Request, Response } from 'express';
import { query } from '../assets/db/mysql';
import { authenticateToken, authorizeLabTechnician, authorizeDoctor } from './middlewares/middleware';

const router = express.Router();

router.get('/', [authenticateToken], async (req: Request, res: Response) => {


});

//Add new data reading
router.post('/', [authenticateToken, authorizeLabTechnician], async (req: Request, res: Response) => {
    const {
        target_names,
        hct,
        mcv,
        kreatinin,
        ast,
        alt,
        ldh,
        ck,
        kalij,
        natrij,
        laka,
        srednja,
        teska,
    } = req.body;

    await query(
        'INSERT INTO readings (target_names, hct, mcv, kreatinin, ast, alt, ldh, ck, kalij, natrij, laka, srednja, teska) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
            target_names,
            hct,
            mcv,
            kreatinin,
            ast,
            alt,
            ldh,
            ck,
            kalij,
            natrij,
            laka,
            srednja,
            teska,
        ]
    );
});


//Edit data reading
router.put('/:id', [authenticateToken, authorizeDoctor], async (req: Request, res: Response) => {
    const readingId = req.params.id;
    const body = req.body;
    const queryString =
        `
    `;
});

export default router;
