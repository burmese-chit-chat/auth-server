import express from "express";
import { Request, Response } from "express";
import mongoose from "mongoose";
import AuthRoutes from "./routes/auth";
import UserRoutes from "./routes/users";
require("dotenv").config();

const PORT: Readonly<number> = 8001;
const mongo_url = process.env.MONGO_URL;
if (!mongo_url) {
    throw new Error("MONGO_URL is not defined");
}

const app = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    console.log('path', req.path);
    res.send("hello world from burmese chit chat AUTHENTICATION service");
});

app.use('/auth', AuthRoutes);
app.use('/users', UserRoutes);

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
