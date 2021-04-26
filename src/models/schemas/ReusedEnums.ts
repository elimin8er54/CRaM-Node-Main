const mongoose = require('mongoose');
import  {ObjectID} from "mongodb";

export enum Action {
    INSERTED = 0,
    UPDATED = 1,
    DELETED =2,
    
}

//This is the schema used in the array @see clientHistory value for the @see clientSchema Schema
export const historySchema = new mongoose.Schema({
    updatedDate:{
        type:Date,
        required:true
    },
    updatedBy:{
        type:ObjectID,
        required:true
    },
    updateAction:{
        type:String,
        required:true,
        enum:[Action]
    },

});