import express from 'express';
import { Logger } from 'winston';
import { Request } from '../types';

const requestLogger = (logger: Logger) => (
  req: Request,
  res: express.Response,
  next: express.NextFunction
) => {
  logger.info('request', {
    method: req.method,
    path: req.path,
    query: req.query,
    userId: req.user && req.user.id,
  });

  next();
};

export default requestLogger;
