import express from 'express';
import cors from 'cors';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import { middleware as OpenApiMiddleware } from 'express-openapi-validator';
import { Logger } from 'winston';
import { Config } from '../types';
import requestLogger from '../middlewares/requestLogger';

const setupApp = (config: Config, logger: Logger) => {
  logger.info('setting up app');

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
      maxAge: 360 * 24 * 60 * 60 * 1000, // 1 year
      overwrite: true,
    })
  );
  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(
    OpenApiMiddleware({
      apiSpec: './api.yaml',
      validateRequests: true,
      validateResponses: true,
      ignorePaths: (path: string) => {
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
  app.use(helmet());
  app.use(requestLogger(logger));
  app.enable('trust proxy');

  return app;
};

export default setupApp;
