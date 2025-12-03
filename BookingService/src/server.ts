import express from 'express';
import {serverConfig} from './config';
import v1Router from './routers/v1/index.router';
import { genericErrorHandler } from './middlewares/error.middleware';
import logger from './config/logger.config';
import { attachCorrelationMiddleware } from './middlewares/correlation.middleware';

const app = express();

export default app;


/**
 * Global Middlewares
 */
app.use(express.json());


app.use(attachCorrelationMiddleware);






/*
* Registering all the routers and their corresponding routes with out app server object.
*/
app.use("/api/v1",v1Router);



/**
 * Generic Error Handler
 */
app.use(genericErrorHandler);

app.listen(serverConfig.PORT, () => {
    console.log(`Server is running on http://localhost:${serverConfig.PORT}`)
    logger.info(`Press Ctrl+C to stop the server.`)
});