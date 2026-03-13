import express from 'express';
import {serverConfig} from './config';
import v1Router from './routers/v1/index.router';
import { genericErrorHandler } from './middlewares/error.middleware';
import logger from './config/logger.config';
import { attachCorrelationMiddleware } from './middlewares/correlation.middleware';
import { NotificationDTO } from './dto/notification.dto';
import { addEmailToQueue } from './producers/email.producers';

//Bull Board UI
import { ExpressAdapter } from '@bull-board/express';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { createBullBoard } from '@bull-board/api';
import { mailerQueue } from './queues/email.queue';


const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/admin/queues');

const { addQueue, removeQueue, setQueues, replaceQueues } = createBullBoard({
  queues: [ new BullMQAdapter(mailerQueue) ],
  serverAdapter: serverAdapter,
});

const app = express();

app.use('/admin/queues', serverAdapter.getRouter());

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
    logger.info(`Press Ctrl+C to stop the server.`);

    const sampleNotification: NotificationDTO = {
        to: "sample",
        subject: "Sample Subject",
        template: "sample-template",
        params: {
            name: "John Doe",
            bookingId: "12345"
        }
    }

    addEmailToQueue(sampleNotification)
});