import type { Request, Response, NextFunction } from 'express';

const withRenewSession = (req: Request, _res: Response, next: NextFunction) => {
  if (req.session) {
    req.session.forceRenew = new Date();
  }
  next();
};

export default withRenewSession;
