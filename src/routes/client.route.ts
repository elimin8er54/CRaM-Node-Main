const { verifyToken } = require("../middleware/authJwt");
const client = require("../controllers/client.controller");
import type { Application } from 'express';

module.exports = function (app: Application) {
  app.post("/api/insertclient",verifyToken, client.insertClient);
  app.post("/api/getclients",verifyToken, client.getClients);
};

