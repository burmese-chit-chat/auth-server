import mongoose from "mongoose";
import ICloudinaryFile from "@src/types/ICloudinaryFile";

export default interface IUser {
    _id?: mongoose.Types.ObjectId;
    username: string;
    password: string;
    name?: string;
    profile? : ICloudinaryFile;
    is_verified : boolean;
    gender? : string;
    age? : number;
    region: string;
    createdAt?: Date;
    updatedAt?: Date;
}