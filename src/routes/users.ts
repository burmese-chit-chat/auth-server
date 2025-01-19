import express, { Request, Response } from 'express';

const UserRoutes = express.Router();

UserRoutes.get('/:_id', (req : Request, res : Response) => {
    console.log('user id in show function', req.params._id);

    res.send('/users/_id');
})