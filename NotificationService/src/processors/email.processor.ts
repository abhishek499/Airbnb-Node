import { Job, Worker } from "bullmq";
import { MAILER_QUEUE } from "../queues/mailer.queue";
import { NotificationDTO } from "../dto/notification.dto";
import { getRedisConnObject } from "../config/redis.config";
import { MAILER_PAYLOAD } from "../producers/email.producer";
import { renderMailTemplate } from "../templates/templates.handler";
import { sendEmail } from "../services/mailer.service";

export const setupMailerWorker = () => {

    const emailProcessor = new Worker<NotificationDTO>(
        MAILER_QUEUE,
        async (job: Job) => {
            if (job.name !== MAILER_PAYLOAD) {
                throw new Error("Invalid job type");
            }

            //Call the service layer from here.
            const payload = job.data;
            console.log("Processing email job with payload:", JSON.stringify(payload));

            const {to,subject,template, params} = payload;

            console.log("Hello", to, subject, template, params);
            
            //Sending email
            const emailContent = await renderMailTemplate(template, params);

            await sendEmail(payload.to, payload.subject, emailContent);

        },
        {
            connection: getRedisConnObject()
        }
    )

    emailProcessor.on("failed", () => {
        console.error("Failed to process email job");
    })

    emailProcessor.on("completed", () => {
        console.log("Email job completed successfully");
    })
}
