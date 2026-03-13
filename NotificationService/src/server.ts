import express from 'express';
import {serverConfig} from './config';
import v1Router from './routers/v1/index.router';
import { genericErrorHandler } from './middlewares/error.middleware';
import logger from './config/logger.config';
import { attachCorrelationMiddleware } from './middlewares/correlation.middleware';
import { setupMailerWorker } from './processors/email.processor';
import { NotificationDTO } from './dto/notification.dto';
import { addEmailToQueue } from './producers/email.producer';
import { renderMailTemplate, } from './templates/templates.handler';

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

app.listen(serverConfig.PORT,async () => {
    console.log(`Server is running on http://localhost:${serverConfig.PORT}`)
    logger.info(`Press Ctrl+C to stop the server.`);
    setupMailerWorker();
    logger.info(`Mailer worker setup completed.`);

    addEmailToQueue({
        to:"ashukla456.as@gmail.com ",
        subject: "Test Email",
        template: "welcome",
        params: {
            name: "Abhishek",
            appName: "Booking App"
        }
    })
});