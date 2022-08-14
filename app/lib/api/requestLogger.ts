import type { Request, Response, NextFunction } from 'express';
import logger from '@lib/logger';

const requestLogger = (req: Request, _res: Response, next: NextFunction) => {
  logger.info('request', {
    method: req.method,
    url: req.url,
    userId: req.user && req.user.id,
  });

  next();
};

export default requestLogger;
