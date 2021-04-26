const bcrypt = require("bcryptjs");
import {UserModel,IUser} from "./schemas/User";
import {createToken} from "../helpers/jwtCreator";
import { Action } from "./schemas/ReusedEnums";

//We can always make a class with a callback for handling what gets sent back to the client.
//But from what I have learned it may lead to issues in the future when we want to do something outside of what the class allows
//Remember we are not making a package we are making something from the packages we use.

interface User  {
  username: string;
  password: string;
}

/**
 * Callback for getting a message 
 *
 * @callback updateUserCallback
 * @param {Object} {} - An obect cointaing the success status.
 */

/**
 * Validate if a user exists and then pass a token and status to a callback
 *
 * @param {Request} req - The request object from the user.
 * @param {updateUserCallback} callback - A callback to run.
 */

export const signIn = async ({username,password}: User, result:(data:{success:boolean,message:string,token:string|null,errorCode:number})=>void) => {
  let success = false;
  let message = "";
  let token = null;
  let errorCode = 500;
  try {
    //Mongoose only validates save. Don't believe its documentation. It wont validate find/findOne and it lies about functions it uses let getFilter()
    const query:Array<IUser> = await UserModel.find({ userUsername:username, isRemoved: {  $eq: false  }},{runValidators: true, context: 'query'}).limit(1);

    //Destruct the query only after we know tha we got at least 1 resulst so we dont get an undefined error
    if (query.length ){
      const {userPassword,_id} = query[0];
      if( bcrypt.compareSync(password,userPassword)){
          success = true;
          message = "You have logged in! If everything worked correctly you shouldn't even see this message!";
          token = createToken(_id);
      }
    } else {
      errorCode = 401;
      message = "Your username or password is incorrect.";
    }
  } catch (err) {
    message = "There was an error in the server. Please let and administrator know";
    errorCode = 500;
    console.log(err);
  }
  result( {success:success,message:message,token:token,errorCode:errorCode})
}


/**
 * Callback for getting a message 
 *
 * @callback getClientCallback
 * @param {Object} {} - An obect cointaing the success status.
 */

/**
 * Update or Insert a user, then pass the results to a callback function.
 *
 * @param {Request} req - The request object from the user.
 * @param {updateUserCallback} callback - A callback to run.
 */
export const createUser = async ({username,password}: User, result:(data:{success:boolean,message:string,token:string|null})=>void) => {
  let success = false;
  let message = "";
  let token = null;
  const pwd = bcrypt.hashSync(password, 8);

  try {
        //We should change this to async/await with a try catch block instead.
    const user:IUser = new UserModel({ userUsername:username.toLocaleLowerCase(),userPassword:pwd,userHistory:[{updatedDate:new Date(),updatedBy:null,updateAction:Action.INSERTED}],teamMasterID:null });
    user.save( (err,values) =>{
      if (err) { 
        message = "There was an error when trying to create the account";
        return console.error(err) } else {
          success = true;
          message = "Account has been created!";
          token = createToken(values._id);
        };
     
    });

  } catch (err) {
    message = "There was an error on the server.";
    console.log(err);
  }
  result( {success:success,message:message,token:token})

}




