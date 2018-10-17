import express from 'express';
import mongoose from 'mongoose';
import AuthHandler from 'core/security/auth-handler';
import GraphqlHandler from 'core/graphql/graphql-handler';

const bodyParser = require('body-parser');

export default async function makeServer() {
  // Set native promises as mongoose promise
  mongoose.Promise = global.Promise;
  // MongoDB Connection
  if (process.env.NODE_ENV !== 'test') {
    await mongoose.connect(process.env.MONGO_DB, { autoIndex: false, useNewUrlParser: true });
  }

  const app = express();

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  AuthHandler.init(app);
  GraphqlHandler.init(app);
  return app;
}
