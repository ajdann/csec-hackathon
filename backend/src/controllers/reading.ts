import express, { Request, Response } from 'express';
import { query } from '../assets/db/mysql';
import { getReadings } from '../services/reading';
import { authenticateToken, authorizeLabTechnician, authorizeDoctor, bodyCheck } from './middlewares/middleware';

const router = express.Router();

router.get('/', [], async (req: Request, res: Response) => {
    const data = await getReadings();
    res.status(200).json(data);
});

//Add new data reading
router.post('/', [authenticateToken, authorizeLabTechnician, bodyCheck], async (req: Request, res: Response) => {
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


    //Since data is paramatirized with ?, all malicious SQL is automatically sanitized
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
router.put('/:id', [authenticateToken, authorizeDoctor, bodyCheck], async (req: Request, res: Response) => {
    const readingId = req.params.id;
    const body = req.body;
    const columns = [...res.locals.columns];

    const selectQuery = `SELECT ${columns.join(', ')} FROM readings`;

    const data = await query(selectQuery);

    res.status(200).json(data);

});

export default router;
