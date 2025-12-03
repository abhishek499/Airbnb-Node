import { NextFunction, Request, Response } from "express";
import fs from 'fs/promises';
import {  InternalServerError } from "../utils/errors/app.error";
import logger from "../config/logger.config";

export const pingHandler = async (req:Request,res:Response, next: NextFunction) => {
    try {
        logger.info("Ping request received.");
        res.status(200).json({
            message:"PONG"
        })
    } catch (error) {
        logger.error("Error occurred while processing ping request.");
        throw new InternalServerError("Something went wrong !!!")
    }
}