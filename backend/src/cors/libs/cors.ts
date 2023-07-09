import { Request, Response, NextFunction } from "express";

export function cors(): (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined {
    return (req: Request, res: Response, next: NextFunction) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type , Accept , Authorization,cache-control,pragma,expires");
        if (req.method === 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT , POST , PATCH, DELETE, GET');
            return res.status(200).json({});
        }
        next();
    }
}