export class AppError extends Error {
    readonly statusCode: number;
    readonly isOperational: boolean;

    constructor(statusCode: number, message: string, isOperational: true) {
        super(message);
        this.name = "AppError";
        this.statusCode = statusCode;
        this.isOperational = isOperational;
    }
}