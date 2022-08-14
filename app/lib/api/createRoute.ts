import passport from 'passport';
import type { NextHandler } from 'next-connect';
import connect from 'next-connect';
import cors from 'cors';
import cookieSession from 'cookie-session';
import cookieParser from 'cookie-parser';
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import Config from '@lib/config';
import setUpPassport from '@lib/passport/setUpPassport';
import logger from '@lib/logger';
import type { Method } from '@lib/types';
import withRenewSession from './withRenewSession';
import withAuthenticatedUser, {
  type AuthByMethod,
} from './withAuthenticatedUser';
import requestLogger from './requestLogger';

const corsMiddleware = cors({
  origin: Config.hostUrl,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
});
const cookieSessionMiddleware = cookieSession({
  name: 'session',
  keys: [Config.authentication.cookieKey],
  maxAge: 365 * 24 * 60 * 60 * 1000, // 1 year
  overwrite: true,
});

type AuthHandler = (
  req: NextApiRequest,
  res: NextApiResponse,
  next: NextHandler
) => void;

export const authRoute = (handler: AuthHandler) => {
  setUpPassport();
  return connect()
    .use(corsMiddleware)
    .use(cookieSessionMiddleware)
    .use(cookieParser())
    .use(passport.initialize())
    .use(passport.session())
    .use(requestLogger)
    .get(handler);
};

const createRoute = (endpoints: EndpointDefinition[]) => {
  setUpPassport();

  const authByMethod = endpoints.reduce(
    (acc, endpoint) => ({
      ...acc,
      [endpoint.method]: endpoint.requiresAuth,
    }),
    {} as AuthByMethod
  );

  const router = connect({
    onError: (err) => {
      logger.error(err.message);
    },
  })
    .use(corsMiddleware)
    .use(cookieSessionMiddleware)
    .use(cookieParser())
    .use(passport.initialize())
    .use(passport.session())
    .use(withRenewSession)
    .use(requestLogger)
    .use(withAuthenticatedUser(authByMethod));

  endpoints.forEach((endpoint) => {
    router[endpoint.method](createRawHandler(endpoint.handler));
  });

  return router;
};

export default createRoute;

const createRawHandler =
  (handler: Handler): NextApiHandler =>
  async (req, res) => {
    const result = await handler(req);
    if (result.headers) {
      Object.entries(result.headers).forEach(([key, value]) =>
        res.setHeader(key, value)
      );
    }
    if (result.redirect) {
      res.redirect(result.status || 307, result.redirect);
    } else {
      res.status(result.status || 200).send(result.body);
    }
  };

type EndpointDefinition = {
  method: Method;
  handler: (req: NextApiRequest) => Promise<HandlerResult> | HandlerResult;
  requiresAuth: boolean;
};

type HandlerResultBase = {
  status?: number;
  headers?: { [key: string]: string };
};

interface HandlerContentResult extends HandlerResultBase {
  body: unknown;
  redirect?: never;
}

interface HandlerRedirectResult extends HandlerResultBase {
  redirect: string;
  body?: never;
}

type HandlerResult = HandlerContentResult | HandlerRedirectResult;

export type Handler = (
  req: NextApiRequest
) => Promise<HandlerResult> | HandlerResult;
