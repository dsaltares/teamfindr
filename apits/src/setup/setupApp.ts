import express from 'express';
import cors from 'cors';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';
import bodyParser from 'body-parser';
import OpenApiValidator from 'express-openapi-validator';

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
  app.enable('trust proxy');

  return app;
};

export default setupApp;
