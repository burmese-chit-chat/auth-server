import express from "express";
import { Request, Response } from "express";
import mongoose from "mongoose";
require("dotenv").config();

const PORT: Readonly<number> = 3001;
const mongo_url = process.env.MONGO_URL;
if (!mongo_url) {
    throw new Error("MONGO_URL is not defined");
}

const app = express();

app.get("/", (req: Request, res: Response) => {
    console.log('path', req.path);
    res.send("hello world from burmese chit chat AUTHENTICATION service");
});

app.get('/auth', (req: Request, res: Response) => {
    res.send('auth path');
});

app.get('/users', (req : Request, res: Response) => {
    res.send('user path');
})

app.use(express.json());


mongoose
    .connect(mongo_url, {})
    .then(() => {
        console.log("connected to user database");
        app.listen(PORT, () => {
            console.log("burmese chit chat authentication server is running on port " + PORT);
        });
    })
    .catch(err => {
        console.error(err);
    });
