import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import { MongoClient } from "mongodb";

import { getCorrelationId } from "../utils/helpers/request.helpers";
import { serverConfig } from ".";


const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp({ format: "MM-DD-YYYY HH:mm:ss" }),
        winston.format.label(),
        winston.format.json(),
        winston.format.printf(({ timestamp, level, message, ...data }) => {
            const output = {
                timestamp,
                level,
                message,
                correlationId: getCorrelationId(),
                data,
            };
            return JSON.stringify(output);
        })
    ),
    transports: [
        new winston.transports.Console(),
        new DailyRotateFile({
            level: "info",
            filename: "logs/%DATE%.log",
            datePattern: "YYYY-MM-DD-HH",
            maxSize: "20m",
            maxFiles: "14d",
        }),
    ],
});

export default logger;