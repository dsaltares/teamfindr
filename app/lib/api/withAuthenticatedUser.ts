import type { Request, Response, NextFunction } from 'express';
import type { Method } from '@lib/types';

export type AuthByMethod = {
  [key in Method]: boolean;
};

const withAuthenticatedUser =
  (authByMethod: AuthByMethod) =>
  (req: Request, res: Response, next: NextFunction) => {
    const auth = !!authByMethod[req.method.toLowerCase() as Method];
    if (auth && !req.user) {
      res.status(401).json({ message: 'user is not authenticated' });
      return;
    }

    next();
  };

export default withAuthenticatedUser;
