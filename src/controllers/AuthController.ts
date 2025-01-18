import { Request, Response } from "express";
import User from "../models/User";
import { send_error_response, send_response } from "../helpers/response";
import { setHTTPOnlyToken } from "../helpers/token";

const AuthController = {
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
    }
};

export default AuthController;