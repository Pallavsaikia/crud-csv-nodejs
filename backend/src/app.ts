import express, { Request, Response, NextFunction } from 'express'
import morgan from 'morgan'
import { cors } from './cors';
import { ErrorHandler, PageNotFoundError } from './middleware';

import { app as apiRoutes } from './routes'






export function app(database: Function) {
    
    const app = express();
    //todo add helmet
    app.use(morgan('dev'))
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    //access control--cors error handling
    app.use(cors());

    if (database) {
        database()
    } else {
        process.exit()
    }




    // //routes
    app.use('/apis/', apiRoutes)


    // //error for page not found
    app.use((req: Request, res: Response, next: NextFunction) => {
        const error = new PageNotFoundError()
        next(error);
    });

    // //global error response--just throw error
    app.use(ErrorHandler);

    

    return app
}

