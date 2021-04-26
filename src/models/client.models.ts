const bcrypt = require("bcryptjs");
import {Client,IClient} from "./schemas/Client"

interface ClientInsert{
clientName:String;
}

/**
 * Callback for inserting a new client
 *
 * @callback createDealCallback
 * @param {Object} {} - An obect cointaing the success status.
 */

/**
 * Add a new client to the Client document, then pass the results to a callback function.
 *
 * @param {Request} req - The request object from the client.
 * @param {createDealCallback} callback - A callback to run.
 */
export const insertClient = async({clientName}:ClientInsert,result:(data:{success:boolean})=>void) =>{

const client: IClient = new Client({ clientName: clientName,clientHistory:[{asd:"asd"}] });
  client.save( (err) => {
    if (err) return console.error(err);
   
  });

  result({success:true})
}

/**
 * Callback for getting all clients
 *
 * @callback getClientCallback
 * @param {Object} {} - An obect cointaing the success status.
 */

/**
 * Get clients from the Client document, then pass the results to a callback function.
 *
 * @param {Request} req - The request object from the client.
 * @param {getClientCallback} callback - A callback to run.
 */
 export const getClients = async(result:(data:{success:boolean,values:{}})=>void) =>{
  

  const values = await Client.find({})
  
    result({success:true,values:values})
  }

