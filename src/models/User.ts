import mongoose, { Schema } from "mongoose";
import bycrypt from "bcrypt";
import IUser from "@src/types/IUser";

interface IUserModel extends mongoose.Model<IUser> {
    register(username: IUser['username'], password: IUser['password']) : Promise<IUser>;
    login(username: IUser['username'], password: IUser['password']) : Promise<IUser>;
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
    }
}, { timestamps: true });

UserSchema.statics.register = async function(username: IUser['username'], password: IUser['password']) : Promise<IUser> {
    try {
        const hashed_password : string = await get_hashed_string(password);

        // save user to database
        const user  = new this({ username, password: hashed_password });
        await user.save();

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