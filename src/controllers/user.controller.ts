const { signIn, createUser } = require('../models/users.models');
import { Request, Response } from "express"


//We still need to leave req as a prameter so express does not think it is Responose instead
//We use exports as an object over "const exports" just so we can leave the names the same 
//Since we cannot redeclare block-scoped variables

/**
 * Express middleware for signing a user in
 * @param {Request} req - The request object from the user.
 * @param {Response} res - The response object to send to the user.
 */
exports.signIn = (req: Request, res: Response): void => {

    if (!req.body) {
      res.status(400).send({ message: 'You didn\'t send anything' });
    }

    // Check database and sign in
    signIn(req.body, ( data: any) => {


      if (!data.success) {
        res.status(data.errorCode).send({
         data
        });
       
      } else {

      res.json(data);
      }
    });
  };

/**
 * Express middleware for inserting a new user
 * @param {Request} req - The request object from the user.
 * @param {Response} res - The response object to send to the user.
 */
exports.createUser = (req: Request, res: Response): void => {

    if (!req.body) {
      res.status(400).send({ message: 'You didn\'t send anything' });
    }

    createUser(req.body, (data: any) => {

      if (!data.success) {

        res.status(500).send({
          data
        });
      } else

        res.json(data);
    });
  };


