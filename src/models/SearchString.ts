import mongoose, { Schema } from "mongoose";
import ISearchString from "../types/ISearchString";
import IUser from "../types/IUser";

interface ISearchStringModel extends mongoose.Model<ISearchString> {
    update : ({user_id, search_string} : { user_id : mongoose.Types.ObjectId, search_string? : string}) => Promise<ISearchString>
    store : ({user_id, search_string} : { user_id : mongoose.Types.ObjectId, search_string? : string}) => Promise<ISearchString>
}

const SearchStringSchema = new Schema<ISearchString>({
    user_id : {
        type : mongoose.Schema.Types.ObjectId, 
        required : true
    }, 
    search_string : {
        type : String, 
        required : false
    }
}, { timestamps : true });

SearchStringSchema.statics.store = async function ({user_id, search_string} : { user_id : IUser['_id'], search_string : string}) : Promise<ISearchString> {
    try {
        const search_string_document = new this({ user_id, search_string });
        await search_string_document.save();
        return search_string_document;
    } catch (e) {
        console.log(e);
        throw new Error((e as Error).message);
    }
}

SearchStringSchema.statics.update = async function ({user_id, search_string} : { user_id : IUser['_id'], search_string : string}) : Promise<ISearchString> {
    try {
        const search_string_document = await this.findOneAndUpdate({ user_id }, { search_string });
        return search_string_document;
    } catch (e) {
        console.log(e);
        throw new Error((e as Error).message);
    }
}


const SearchString : ISearchStringModel = mongoose.model<ISearchString, ISearchStringModel>("SearchString", SearchStringSchema);
export default SearchString;