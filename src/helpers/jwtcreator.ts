const jwt = require("jsonwebtoken");
const auth = require("../config/auth.config");
/**
 * Create a token for a validated user and return the created token
 *
 * @param {String} userId - The unique user id to append to the token so that it is impossible to be duplicated
 */

export const createToken = (userId: string)=>{
  const token = jwt.sign({ userId: userId }, auth.secret, {
    // For now we will always keep it alive for only an hour.
    //We can make this into an argument in the future if we need to.
    expiresIn: 60 * 100,
  });
return token;
}