import type { Request, Response, NextFunction } from 'express';
const path = require('path');
const express = require("express");
const mongoose = require('mongoose');
const compression = require('compression');
import config from "./config/config";
const winston = require('winston');
const morgan = require('morgan');

const app = express();
const uri = config.MONGODB_DATABASE;
const origin = "dut6jrd9rtjkk.cloudfront.net";
const logLocation = "logs";
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({ filename: logLocation + '/error.log', level: 'error' }),
    new winston.transports.File({ filename: logLocation + '/combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'development') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

//Don't want to do anything before the connection to the database is established.
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const client = mongoose.connection;
client.on('error', console.error.bind(console, 'connection error:'));
client.once('open', function () {

  app.use(compression());
  const port = 3001;
  app.use(express.urlencoded());
  app.use(express.json());
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.append("Access-Control-Allow-Origin", [origin]);
    res.append("Access-Control-Allow-Methods", "GET,PUT,POST,PATCH,DELETE");
    res.append("Access-Control-Allow-Headers", "Content-Type,Authorization");
    next();
  });


  require("./routes/client.route")(app);
  require("./routes/user.route")(app);

  app.get("*", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname + "../../../../dist/", "index.html"));
  });

  app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
  });


});