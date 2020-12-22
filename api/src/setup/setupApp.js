const express = require('express');
const cors = require('cors');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');

const CLIENT_HOME_PAGE_URL = 'http://localhost:3000';

const setupApp = (config) => {
  const app = express();
  app.use(
    cors({
      origin: CLIENT_HOME_PAGE_URL,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
    })
  );
  app.use(
    cookieSession({
      name: 'session',
      keys: [config.cookieKey],
      maxAge: 24 * 60 * 60 * 1000,
    })
  );
  app.use(cookieParser());
  app.use(passport.initialize());
  app.use(passport.session());

  return app;
};

module.exports = setupApp;
