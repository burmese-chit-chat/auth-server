import { Response } from "express";
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import mongoose from "mongoose";

export function generateToken (_id : mongoose.Types.ObjectId) : string {
    const maxAge = 3 * 24 * 60 * 60; // 3 days in seconds
    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    return jwt.sign({ _id }, jwtSecretKey!, { expiresIn : maxAge });
}

export async function setHTTPOnlyToken (_id : mongoose.Types.ObjectId, res : Response) : Promise<string> {
    try {
        const maxAgeForCookie = 3 * 24 * 60 * 60 * 1000; // 3 days in mili-seconds
        const token = generateToken(_id);
        res.cookie('token', token, { httpOnly : true, maxAge : maxAgeForCookie, secure : true, sameSite : 'none' , partitioned : true });
        return token;
    } catch (e) {
        console.error('Error in setting HTTP only token', e);
        throw e;
    }
}

export function removeToken (res : Response) : string {
    const token = '';
    res.cookie('token', token, { httpOnly : true, maxAge : -1, secure : true, sameSite : 'none' , partitioned : true });
    return token;
}