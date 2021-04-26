const mongoose = require('mongoose');
import type { Schema,Model,Document }  from "mongoose";
import  {ObjectID} from "mongodb";
import {historySchema} from "./ReusedEnums";

export interface IUser extends Document  {
  userPassword:string;
}

const userSchema:Schema = new mongoose.Schema({
    userName: {
        type: String
      },
      userUsername: {
        type: String,
        lowercase: true,
        required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
        minLength:3,
        maxLength:20
      },
      userPassword: {
        type: String,
        required: true
      },
      userPhone:String,
      userEmail:{
        type:String,
        lowercase: true,
      },
      userPhotoURL:String,
      userIsRemoved: {
        type: Boolean,
        required: true,
        default:false
      },
      //This is the ID of the super owner. This ID will be its own _id if it is the master account
      teamMasterID: {
        type: ObjectID,
        // @ts-ignore
        required: function() {
          // @ts-ignore
          return typeof this.teamMasterID === 'undefined' || (this.teamMasterID != null && typeof this.teamMasterID != 'string')
        }
    
       
      },
    userHistory: {
        type:[historySchema],
         validate: (v:[]) => v == null || v.length > 0
    }
  });


  


  export const UserModel:Model<IUser> = mongoose.model('User', userSchema);

