import mongoose from "mongoose";
import ICloudinaryFile from "@src/types/ICloudinaryFile";

export default interface IUser {
    _id?: mongoose.Types.ObjectId;
    username: string;
    password: string;
    name?: string;
    profile? : ICloudinaryFile;
    createdAt?: Date;
    updatedAt?: Date;
}