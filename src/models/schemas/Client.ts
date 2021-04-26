const mongoose = require('mongoose');
import type { Schema,Model,Document }  from "mongoose";
import {ObjectID} from "mongodb";
import {historySchema} from "./ReusedEnums";


export interface IClient extends Document {
  email: string;
  firstName: string;
  lastName: string;
}

const clientSchema:Schema = new mongoose.Schema({
    clientName: {
        type: String,
        required: true
      },
    clientPhone:String,
    clientEmail:String,
    clientPhotoURL:String,
    clientIsRemoved: {
        type: Boolean,
        required: true,
        default:false
      },
    clientUserID: [ObjectID],

    
    clientHistory: {
    type:[historySchema],
    validate: (v:[]) => v == null || v.length > 0
    }
  });

  export const Client: Model<IClient> = mongoose.model('Client', clientSchema);

