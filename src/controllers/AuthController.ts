import { Request, Response } from "express";

const AuthController = {
    login : async (req : Request, res : Response) => {
        res.send('Login route');
    }, 

    register : async (req : Request, res : Response) => {
        res.send('Register route');
    }
};

export default AuthController;