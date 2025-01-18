import { Request, Response } from "express";
import User from "../models/User";
import { send_error_response, send_response } from "../helpers/response";
import { setHTTPOnlyToken, getUserFromToken } from "../helpers/token";
import IUser from "../types/IUser";

const AuthController = {
    me : async (req : Request, res : Response) => {
        try {
            const token = req.query.token as string;
            if(!token) {
                throw new Error('token not found');
            }
            const user : IUser | null = await getUserFromToken(token);
            if(!user) {
                throw new Error('User not found');
            }

            send_response(res, 200, user, 'User found: authenticated', token);
        } catch (e) {
            send_error_response(res, 400, (e as Error).message);
        }

    },

    login : async (req : Request, res : Response) => {
        res.send('Login route');
    }, 

    register : async (req : Request, res : Response) => {
        console.log('register body', req.body);
        console.log('here');
        try {
            const { username, password } = req.body;
            const user = await User.register(username, password);
            if(!user || !user._id) {
                throw new Error('User not registered');
            }
            console.log('user', user);
            const token = await setHTTPOnlyToken(user._id, res);
            console.log('token',token);
            send_response(res, 200, user, "success fully registered", token);

        } catch (e) {
            send_error_response(res, 400, (e as Error).message);
        }
    }, 

    is_valid_username: async (req : Request, res : Response) => {
        try {
            const { username } = req.query;
            const user = await User.findOne({ username });
            console.log('user', user);
            if (user) {
                throw new Error('Username already exists');
            }
            send_response(res, 200, null, 'username is valid');
        } catch (e) {
            send_error_response(res, 400, (e as Error).message);
        }
    }
};

export default AuthController;