import { NextFunction, Request, Response } from "express";
import { ZodError, ZodObject } from "zod";
import logger from "../config/logger.config";


/**
 * 
 * @param schema - Zod schema to validate request body
 * @returns - Middleware function to validate request body
 */
export const validateRequestBody = (schema: ZodObject) => {
    return async (req:Request, res:Response, next:NextFunction) => {
        try {
            logger.info("Validating request body.");
            await schema.parseAsync(req.body);
            logger.info("Request body is valid.");
            next();
        } catch (error: any) {
            // next(error);
            logger.error("Request body validation failed.");
            return res.status(400).json({
                message: 'Invalid request body',
                success: false,
                error: error.issues
            });
        }
    }
};



/**
 * 
 * @param schema - Zod schema to validate request body
 * @returns - Middleware function to validate request body
 */
export const validateQueryParams = (schema: ZodObject) => {
    return async (req:Request, res:Response, next:NextFunction) => {
        try {
            await schema.parseAsync(req.query);
            console.log("Request body is valid.");
            next();
        } catch (error: any) {
            // next(error);
            return res.status(400).json({
                message: 'Invalid request body',
                success: false,
                error: error.issues
            });
        }
    }
};