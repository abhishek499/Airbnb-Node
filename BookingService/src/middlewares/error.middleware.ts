import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/errors/app.error";
import { ZodError } from "zod";
import { StatusCodes } from "http-status-codes";


export const genericErrorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
    console.log("Middleware Error", err)
    res.status(err.statusCode).json({
        success: false,
        message: err.message
    })
}


// export const genericErrorHandlerMoreGeneral = (err: Error, req: Request, res: Response, next: NextFunction) => {
//     console.log(err)
//     if (err instanceof AppError) {
//         res.status(err.statusCode).json({
//             success: false,
//             message: err.message
//         })
//     } else if (err instanceof ZodError) {
//         console.log(err)
//         res.status(StatusCodes.BAD_REQUEST).json({
//             success: false,
//             message: err.issues
//         })
//     } else {
//         res.status(500).json({
//             success: false,
//             message: "Internal Server Error"
//         })
//     }
// }
