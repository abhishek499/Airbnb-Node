// class AppError extends Error {
//     statusCode: number;
    
//     constructor(message: string, statusCode: number){
//         super(message);
//         this.statusCode = statusCode
//     }
// }

export interface AppError extends Error {
    statusCode: number;
}

export class AppError extends Error {
    statusCode: number;
    message: string;
    name:string;
    constructor(message:string, statusCode: number){
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.name = "Application Error";
    }
}

export class InternalServerError implements AppError {
    statusCode: number;
    message: string;
    name: string;
    constructor(message: string) {
        this.statusCode = 500;
        this.message = message;
        this.name = "Internal Server Error";
    }
}

export class NotFoundError implements AppError {
    statusCode: number;
    message: string;
    name: string;
    constructor(message:string){
        this.statusCode = 404;
        this.message = message;
        this.name = "Not Found";
    }
}

export class ConflictError implements AppError {
    statusCode: number;
    message: string;
    name: string;
    constructor(message:string){
        this.statusCode = 409;
        this.message = message;
        this.name = "Conflict Error";
    }
}

export class BadRequestError implements AppError {
    statusCode: number;
    message: string;
    name: string;
    constructor(message:string){
        this.statusCode = 400;
        this.message = message;
        this.name = "Bad Request";
    }
}