import {v4 as uuidv4} from 'uuid';
import {Request, Response, NextFunction} from 'express';
import { asyncLocalStorage } from '../utils/helpers/request.helpers';

export const attachCorrelationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    //Generate a unique correlation ID for each request
    const correlationId :string = uuidv4();

    // Attach the correlation ID to the request and response headers
    req.headers['x-correlation-id'] = correlationId;
    res.setHeader('x-correlation-id', correlationId);

    asyncLocalStorage.run({correlationId: correlationId}, () => {
        next();
    });
}