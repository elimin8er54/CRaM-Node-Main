const {
  insertClient,
  getClients
} = require('../models/client.models');

import { Request, Response } from "express"

//We still need to leave req as a prameter so express does not think it is Responose instead
//We use exports as an object over "const exports" just so we can leave the names the same 
//Since we cannot redeclare block-scoped variables


/**
 * Express middleware for getting all clients
 *
 * @param {Request} req - The request object from the user.
 * @param {Response} res - The response object to send to the user.
 */
exports.getClients = (req: Request,res: Response): void => {

    getClients((data: any) => {
   
      if (!data.success) {

        res.status(500).send({
          data
        });
      } else

        res.json(data);
    });
  };

  /**
 * Express middleware for inserting a new client. It also handles updating a client if they do not exist
 *
 * @param {Request} req - The request object from the user.
 * @param {Response} res - The response object to send to the user.
 */
exports.insertClient = (req: Request, res: Response): void => {
   
    if (!req.body) {
      res.status(400).send({ message: 'You didn\'t send anything' });
    }

    insertClient(req, (data: any) => {

      if (!data.success) {

        res.status(500).send({
          data
        });
      } else

        res.json(data);
    });
  };
