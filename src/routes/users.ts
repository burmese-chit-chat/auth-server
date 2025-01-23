import express from 'express';
import UserController from '../controllers/UserController';
import UserDataController from '../controllers/UserDataController';

const UserRoutes = express.Router();

UserRoutes.get('/:_id', UserController.show);
UserRoutes.get('/:_id/user-data', UserDataController.show_with_user_id);
UserRoutes.put('/:_id', UserController.update);
UserRoutes.delete('/:_id', UserController.destroy);

export default UserRoutes;