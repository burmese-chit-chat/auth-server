import express from 'express';
import AuthController from '../controllers/AuthController';
const AuthRoutes = express.Router();

AuthRoutes.post('/login', AuthController.login);
AuthRoutes.post('/register', AuthController.register);


export default AuthRoutes;