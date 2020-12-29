const express = require('express');
const cors = require('cors');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const OpenApiValidator = require('express-openapi-validator');

const setupApp = (config) => {
  const app = express();
  app.use(
    cors({
      origin: config.clientUrl,
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
  app.use(bodyParser.json());
  app.use(
    OpenApiValidator.middleware({
      apiSpec: './api.yaml',
      validateRequests: true,
      validateResponses: true,
      ignorePaths: (path) => {
        const ignoredPaths = [
          '/auth/failed',
          '/auth/twitter',
          '/auth/twitter/redirect',
          '/auth/facebook',
          '/auth/facebook/redirect',
          '/auth/google',
          '/auth/google/redirect',
        ];
        return ignoredPaths.includes(path);
      },
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());

  return app;
};

module.exports = setupApp;
