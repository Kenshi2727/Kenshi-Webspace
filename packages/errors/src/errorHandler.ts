import { Request, Response, NextFunction } from 'express'
import { AppError } from './AppError'

export function errorHandler(
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message
        });
    }


    //todo: add logger once global Logger is implemented


    return res.status(500).json({
        success: false,
        message: "Inetrnal Server Error"
    })
}