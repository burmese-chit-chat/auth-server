import express from 'express';
import AuthController from '@src/controllers/AuthController';
const AuthRoutes = express.Router();

AuthRoutes.post('/login', AuthController.login);


export default AuthRoutes;