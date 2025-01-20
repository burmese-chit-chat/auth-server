import mongoose, { Schema } from "mongoose";
import IUserData from "../types/IUserData";

interface IStoreFunctionProp {
    user_id : mongoose.Types.ObjectId;
    interests_1? : string;
    interests_2? : string;
    interests_3? : string;
    interests_4? : string;
    interests_5? : string;
    status_message? : string;
    about_me? : string;
}
interface IUserDataModel extends mongoose.Model<IUserData> {
    store : (params : IStoreFunctionProp ) => Promise<IUserData>
    update : ( params : IStoreFunctionProp ) => Promise<IUserData>
}

const UserDataSchema = new Schema<IUserData>({
    user_id : {
        type : mongoose.Schema.Types.ObjectId, 
        required : true
    }, 
    interests_1 : {
        type : String, 
        required : false
    },
    interests_2 : {
        type : String, 
        required : false
    },
    interests_3 : {
        type : String, 
        required : false
    },
    interests_4 : {
        type : String, 
        required : false
    },
    interests_5 : {
        type : String, 
        required : false
    },
    status_message : {
        type : String, 
        required : false
    },
    about_me : {
        type : String, 
        required : false
    },
}, { timestamps : true });

UserDataSchema.statics.store = async function (params : IStoreFunctionProp ) : Promise<IUserData> {
    try {
        const user_data = new this(params);
        await user_data.save();
        return user_data; 
    } catch (e) {
        console.log(e);
        throw new Error((e as Error).message);
    }
}

UserDataSchema.statics.update = async function (params : IStoreFunctionProp) : Promise<IUserData> {
    try {
        const user_data = await this.findOneAndUpdate({ 
            user_id : params.user_id
        }, params );
        return user_data;
    } catch (e) {
        console.log(e);
        throw new Error((e as Error).message);
    }
}

const UserData : IUserDataModel = mongoose.model<IUserData, IUserDataModel>("UserData", UserDataSchema);
export default UserData;