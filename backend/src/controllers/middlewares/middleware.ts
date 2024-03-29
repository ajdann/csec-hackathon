import { Request, Response, RequestHandler, NextFunction } from 'express';

import jwt from 'jsonwebtoken';
import xss from 'xss';

import { query } from '../../assets/db/mysql';

//JWT Authentication Tutorial - Node.js (Youtube)
export const authenticateToken = (
    req: Request,
    res: Response,
    next: NextFunction) => {

    const authHeader = req.headers['authorization'];
    const token = (authHeader && authHeader.split(' ')[1]) ?? null;
    if (!token) return res.sendStatus(401);

    jwt.verify(token, (process.env.SECRET_KEY || ''), (err, user) => {
        if (err)
            return res.sendStatus(403);
        next();
    })
}

export const authorizeLabTechnician = async (req: any, res: any, next: any) => {
    const requiredRoles = ['labTech']

    const user: any = req.user;

    //Parameters were parametirized instead of string interpolation
    const queryString = `
            SELECT roles.name AS 
                roleName 
            FROM 
                users 
            JOIN 
                roles 
            ON 
                users.roleId = roles.id 
            WHERE 
                users.id = ?;
            `;

    const userRole: any = await query(queryString, user.id);

    if (!requiredRoles.includes(userRole)) {
        return res.status(403).json({ message: 'Unauthorized' });
    }

    const allowedColumns = `
            SELECT DISTINCT 
                dc.id, dc.name
            FROM 
                dataColumns dc
            JOIN 
                permissions p ON dc.id = p.columnId
            JOIN 
                roles r ON p.roleId = r.id
            WHERE 
                r.id = ?;
            `;

    const dataColumns = await query(allowedColumns);

    res.locals.columns = dataColumns ?? [];

    next();
};

export const authorizeDoctor = async (req: any, res: any, next: any) => {

    const requiredRoles = ['doctor'];
    const user: any = req.user;

    //Parameters were parametirized instead of string interpolation
    const queryString = `
            SELECT roles.name AS 
                roleName 
            FROM 
                users 
            JOIN 
                roles 
            ON 
                users.roleId = roles.id 
            WHERE 
                users.id = ?;
            `;

    const userRole: any = await query(queryString, user.id);

    if (!requiredRoles.includes(userRole)) {
        return res.status(403).json({ message: 'Unauthorized' });
    }

    const allowedColumns = `
            SELECT DISTINCT 
                dc.id, dc.name
            FROM 
                dataColumns dc
            JOIN 
                permissions p ON dc.id = p.columnId
            JOIN 
                roles r ON p.roleId = r.id
            WHERE 
                r.id = ?;
            `;

    const dataColumns = await query(allowedColumns);

    res.locals.columns = dataColumns ?? [];

    next();
};

export const paginationCheck = (
    req: Request,
    res: Response,
    next: NextFunction) => {

    if (!req.query?.page || !req.query?.size)
        return res
            .status(400)
            .json({ meesage: "Bad request!" });
    next();
}

export const bodyCheck = (req: Request, res: Response, next: NextFunction) => {
    const emptyBody =
        (!req.body || Object.keys(req.body).length == 0) ?? false;

    if (emptyBody)
        return res
            .status(400)
            .json({ message: "No data body provided!" });

    //Sanitize body
    const sanitizedData = xss(req.body.data);
    req.body.data = sanitizedData;

    next();
}

export const checkIdParam = (req: Request, res: Response, next: NextFunction) => {
    if (!req.params.id) res.status(400).json({ message: "Bad request!" });
    next();
}