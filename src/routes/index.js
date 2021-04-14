const express = require('express');
const session = require('./session');
const user = require('./user');
const message = require('./message');

const apiRouter = (dependencies) => {
  const routes = express.Router();

  const messageRouter = message(dependencies);

  //routes.use('/session', session);
  //routes.use('/users', user);
  routes.use('/messages', messageRouter);
  
  return routes;
};

module.exports = apiRouter;

/*

import session from './session';
import user from './user';
import message from './message';

export default {
  session,
  user,
  message,
};
*/