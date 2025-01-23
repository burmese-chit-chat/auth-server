import { Request, Response } from "express";
import User from "../models/User";
import mongoose from "mongoose";
import UserData from "../models/UserData";
import IUser from "../types/IUser";
import IUserData from "../types/IUserData";
import SearchString from "../models/SearchString";
import { send_error_response, send_response } from "../helpers/response";

const UserController = {
    show : async function (req : Request, res : Response) {
        try {
            if(!req.params._id) throw new Error('user not found, id needed');
            const user = await User.findById(req.params._id);
            
            send_response(res, 200, user, 'user found');
        } catch (e) {
            console.log(e);
            send_error_response(res, 500, (e as Error).message);
        }
    },
    update: async function (req: Request, res: Response) {
        try {
            if(!req.params._id) throw new Error("user not found");
            const user_id = new mongoose.Types.ObjectId(req.params._id);

            //get data for user table
            const { name, age, gender, region, profile } = req.body;

            // get data for userdata table
            const { interests_1, interests_2, interests_3, interests_4, interests_5 , status_message, about_me } = req.body;

            // update user and user data table
            const [ user, user_data ] = await Promise.all([
                User.update({ _id : user_id, name , age, gender, region, secure_url : profile }), 
                UserData.update({ user_id, interests_1, interests_2, interests_3, interests_4, interests_5, status_message, about_me }), 
                
            ]);

            const search_string = get_search_string_from_user_and_user_data(user, user_data);
            const search_string_document = await SearchString.update({ user_id, search_string });

            send_response(res, 200, { user, user_data, search_string_document }, 'successfully updated the user');
        } catch (e) {
            console.log(e);
            send_error_response(res, 500, (e as Error).message);            
        }
    },

    destroy: async function (req : Request, res : Response) {
        try {
            const user_id = new mongoose.Types.ObjectId(req.params._id);
            if(!user_id) throw new Error('user not found, id_needed');

            // delete user search string
            const search_string_document = await SearchString.destroy(user_id);
            // delete user data 
            const user_data = await UserData.destroy(user_id);
            // delete user 
            const user = await User.destroy(user_id);

            send_response(res, 200, { user, user_data, search_string_document }, 'user deleted successfully');
        } catch (e) {
            console.log(e);
            send_error_response(res, 500, (e as Error).message);
        } 
    }
};




function get_search_string_from_user_and_user_data (user : IUser, user_data : IUserData) : string {
    return `${ user.name }${ user_data.about_me }${ user_data.status_message }${ user_data.interests_1 }${ user_data.interests_2 }${ user_data.interests_3}${ user_data.interests_4}${ user_data.interests_5}`;
}
export default UserController;
