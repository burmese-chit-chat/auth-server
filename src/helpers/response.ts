import { Response } from "express";

export function send_response (res: Response, status: number, data: any, message: string, token?: string) {
    res.status(status).json({
        data: data,
        message: message,
        token: token ? token : null
    });
}

export function send_error_response(res: Response, status: number, message: string) {
    res.status(status).send({
        message: message
    });
}