import { Request, Response } from "express";
import UserData from "../models/UserData";
import { send_error_response, send_response } from "../helpers/response";

export default {
    show_with_user_id : async function (req : Request, res : Response) {
        try {
            const user_id = req.params._id;
            if(!user_id) throw new Error('user data not found, id needed');
            const user_data = await UserData.findOne({ user_id });
            send_response(res, 200, user_data, 'user data found');
        } catch (e) {
            send_error_response(res, 404, (e as Error).message); 
        }
    }
}
