import express from 'express';
import AuthController from '../controllers/AuthController';
const AuthRoutes = express.Router();

AuthRoutes.get('/me', AuthController.me);
AuthRoutes.post('/login', AuthController.login);
AuthRoutes.post('/register', AuthController.register);
AuthRoutes.get('/is-valid-username', AuthController.is_valid_username);


export default AuthRoutes;