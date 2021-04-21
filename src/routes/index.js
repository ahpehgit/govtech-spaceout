const express = require('express');
const session = require('./session');
const user = require('./user');
const message = require('./message');
const facility = require('./facility');

const apiRouter = (dependencies) => {
  const routes = express.Router();

  const messageRouter = message(dependencies);
  const facilityRouter = facility(dependencies);
  
  //routes.use('/session', session);
  //routes.use('/users', user);
  routes.use('/messages', messageRouter);
  routes.use('/facilities', facilityRouter);
  
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