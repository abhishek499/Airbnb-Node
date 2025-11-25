import express from 'express';
import {serverConfig} from './config';
import v1Router from './routers/v1/index.router';
import { genericErrorHandler } from './middlewares/error.middleware';
import logger from './config/logger.config';
import { attachCorrelationMiddleware } from './middlewares/correlation.middleware';
import sequelize from './db/models/sequelize';
import Hotel from './db/models/hotel';

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

app.listen(serverConfig.PORT, async () => {
    console.log(`Server is running on http://localhost:${serverConfig.PORT}`)
    logger.info(`Press Ctrl+C to stop the server.`)
    await sequelize.authenticate();
    logger.info("Connection to the database has been established successfully.");
});