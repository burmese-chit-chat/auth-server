import mongoose from "mongoose";

interface ISearchString {
    _id? : mongoose.Types.ObjectId;
    user_id : mongoose.Types.ObjectId;
    search_string? : string;
    createdAt? : Date;
    updatedAt? : Date;
}

export default ISearchString;