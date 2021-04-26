const mongoose = require('mongoose');
import  {ObjectID} from "mongodb";
import {historySchema} from "./ReusedEnums";

const userSchema = new mongoose.Schema({
    teamName: {
        type: String,
        required: true
      },
     teamIsRemoved: {
        type: Boolean,
        required: true,
        default:false
      },
      teamUserID: [ObjectID],
       teamHistory: {
        type:[historySchema],
        required:true
    }
  });

  export const User = mongoose.model('User', userSchema);

