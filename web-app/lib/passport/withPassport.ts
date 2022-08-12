import passport from 'passport';
import nextConnect from 'next-connect';
import cors from 'cors';
import cookieSession from 'cookie-session';
import cookieParser from 'cookie-parser';
import TwitterPassport from 'passport-twitter';
import FacebookPassport from 'passport-facebook';
import GooglePassport from 'passport-google-oauth20';
import type { NextApiHandler } from 'next';
import Config from '@lib/config';
import serializeUser from './serializeUser';
import deserializeUser from './deserializeUser';
import verifyFacebook from './verifyFacebook';
import verifyTwitter from './verifyTwitter';
import verifyGoogle from './verifyGoogle';

passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

passport.use(
  new TwitterPassport.Strategy(
    {
      consumerKey: Config.authentication.twitter.clientId,
      consumerSecret: Config.authentication.twitter.clientSecret,
      callbackURL: '/api/auth/twitter/redirect',
      includeEmail: true,
      includeEntities: false,
      includeStatus: false,
    },
    verifyTwitter
  )
);

passport.use(
  new FacebookPassport.Strategy(
    {
      clientID: Config.authentication.facebook.clientId,
      clientSecret: Config.authentication.facebook.clientSecret,
      callbackURL: '/api/auth/facebook/redirect',
      profileFields: ['id', 'displayName', 'photos', 'email'],
    },
    verifyFacebook
  )
);

passport.use(
  new GooglePassport.Strategy(
    {
      clientID: Config.authentication.google.clientId,
      clientSecret: Config.authentication.google.clientSecret,
      callbackURL: '/api/auth/google/redirect',
    },
    verifyGoogle
  )
);

const withPassport = (handler: NextApiHandler) =>
  nextConnect()
    .use(
      cors({
        origin: Config.hostUrl,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
      })
    )
    .use(
      cookieSession({
        name: 'session',
        keys: [Config.authentication.cookieKey],
        maxAge: 365 * 24 * 60 * 60 * 1000, // 1 year
        overwrite: true,
      })
    )
    .use(cookieParser())
    .use(passport.initialize())
    .use(passport.session())
    .all(handler);

export default withPassport;
