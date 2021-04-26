const mongoose = require('mongoose');
import type { Schema,Model,Document }  from "mongoose";
import  {ObjectID} from "mongodb";
import {historySchema} from "./ReusedEnums";

export enum DealStage {
  NOTHING = 0,
  CONTACTED = 1,
  LEAD = 2,
  PENDING = 3,
  FINAL = 4,
  NULL = 5
}

export interface IDeal extends Document {
  userName: string;
}

const dealSchema:Schema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
      },
     
      dealClientID: {
        type: [ObjectID],

      },
      dealTotal: {
        type: Number,

      },
    
      dealIsRemoved: {
        type: Boolean,
        required: true,
        default:false
      },
      clientStage:{
        type:String,
        required:true,
        enum:[DealStage],
        default:DealStage.NOTHING
    },

    userHistory: {
        type:[historySchema],
        required:true
    }
  });

  export const Deal: Model<IDeal> = mongoose.model('Deal', dealSchema);

