import mongoose, { Schema } from "mongoose";
import bycrypt from "bcrypt";
import IUser from "@src/types/IUser";
import UserData from "./UserData";
import SearchString from "./SearchString";

interface IUpdateFunction {
    _id : mongoose.Types.ObjectId;
    name? : string;
    secure_url? : string; 
    gender? : string;
    age? : number; 
    region? : string;
    public_id? : string
}
interface IUserModel extends mongoose.Model<IUser> {
    register(username: IUser['username'], password: IUser['password']) : Promise<IUser>;
    login(username: IUser['username'], password: IUser['password']) : Promise<IUser>;
    update(params : IUpdateFunction) : Promise<IUser>;
    destroy(user_id : IUser['_id']) : Promise<IUser>;
}


const UserSchema = new Schema<IUser>({
    username : {
        type: String,
        required: true,
        unique: true
    }, 
    password : {
        type: String,
        required: true
    }, 
    name : {
        type: String, 
        required: false
    }, 
    profile : {
        type : Object, 
        required: false
    }, 
    is_verified : {
        type: Boolean, 
        required: true, 
        default : false
    }, 
    gender : {
        type : String, 
        required: false, 
        max : 10
    }, 
    age : {
        type : Number, 
        required : false,
        max : 100
    }, 
    region : {
        type : String, 
        required : false
    }
}, { timestamps: true });

UserSchema.statics.register = async function(username: IUser['username'], password: IUser['password']) : Promise<IUser> {
    try {
        const hashed_password : string = await get_hashed_string(password);

        // save user to database
        const user  = new this({ username, password: hashed_password });
        await Promise.all([ user.save(), UserData.store({ user_id : user._id }) , SearchString.store({ user_id : user._id })]);

        // return user
        return user; 
    } catch (e) {
        console.error('error in register', e);
        throw e;
    }
}

UserSchema.statics.login = async function(username: IUser['username'], password: IUser['password']) : Promise<IUser> {
    try {
        // find user by username
        const user = await this.findOne({ username });
        if (!user) {
            throw new Error('User not found');
        }

        // compare password
        await compare_hashed_string(password, user.password, 'Password is incorrect');

        return user;
    } catch (e) {
        console.error('error in login', e);
        throw e;
    }
}

UserSchema.statics.update = async function (params : IUpdateFunction) : Promise<IUser> {
    try {
        const user = await this.findById(params._id);
        if(!user) throw new Error('user not found');

            const profile : IUser['profile'] = {
                secure_url : params.secure_url, 
                public_id : params.public_id
            }
            user.profile = profile;

        user.name = params.name || null;
        user.age = params.age || null;
        user.gender = params.gender || null;
        user.region = params.region || null;

        await user.save();
        return user;
    } catch (e) {
        console.log(e);
        throw e;
    }
}

UserSchema.statics.destroy = async function(user_id : IUser['_id']) : Promise<IUser> {
    try {
        const user = await this.findByIdAndDelete(user_id);
        return user;
    } catch (e) {
        console.log(e);
        throw e;
    }
}

async function get_hashed_string(original_string: string) : Promise<string> {
    try {
        const salt_rounds = 10;
        return await bycrypt.hash(original_string, salt_rounds);
    } catch (e) {
        console.error('error in get_hashed_string', e);
        throw e;
    }
}

async function compare_hashed_string(original_string: string, hashed_string: string, error_message: string) : Promise<void> {
    try {
        const is_valid = await bycrypt.compare(original_string, hashed_string);
        if (!is_valid) {
            throw new Error(error_message);
        }
    } catch (e) {
        console.error('error in compare_hashed_string', e);
        throw e;
    }
}




const User : IUserModel = mongoose.model<IUser, IUserModel>("User", UserSchema);
export default User;