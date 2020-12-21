import express from 'express';
import cors from 'cors';
import passport from 'passport';
import TwitterPassport from 'passport-twitter';
import FacebookPassport from 'passport-facebook';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';
import { MongoClient } from 'mongodb';
import { v4 as uuid } from 'uuid';

import getConfig from './getConfig';

const CLIENT_HOME_PAGE_URL = 'http://localhost:3000';

interface MongoUser {
  _id: string;
  name: string;
  avatar: string;
  email: string;
}

interface User {
  id: string;
  name: string;
  avatar: string;
  email: string;
}

const formatUser = ({ _id, ...fields }: MongoUser): User => ({
  id: _id,
  ...fields,
});

const init = async () => {
  const config = await getConfig();

  const client = new MongoClient(config.databaseURI, {
    useUnifiedTopology: true,
  });
  await client.connect();
  const db = client.db();
  const userCollection = db.collection('User');

  passport.serializeUser((user: User, cb) => {
    console.log('serializeUser', user);
    cb(null, user.id);
  });

  passport.deserializeUser(async (id, cb) => {
    console.log('deserializeUser', id);
    const mongoUser = await userCollection.findOne({ _id: id });
    cb(null, formatUser(mongoUser));
  });

  passport.use(
    new TwitterPassport.Strategy(
      {
        consumerKey: config.authentication.twitter.clientID,
        consumerSecret: config.authentication.twitter.clientSecret,
        callbackURL: '/auth/twitter/redirect',
        includeEmail: true,
        includeEntities: false,
        includeStatus: false,
      },
      async (accessToken, refreshToken, profile, cb) => {
        const email = profile.emails[0].value;
        const name = profile.displayName;
        const avatar = profile.photos[0].value;
        const twitterId = profile.id;
        const twitterHandle = profile.username;

        const mongoUser = await userCollection.findOne({ email });
        if (mongoUser) {
          cb(null, formatUser(mongoUser));
          return;
        }

        const userFields = {
          _id: uuid(),
          createdAt: new Date(),
          email,
          name,
          avatar,
          twitter: {
            id: twitterId,
            handle: twitterHandle,
          },
        };

        await userCollection.insertOne(userFields);
        cb(null, formatUser(userFields));
      }
    )
  );

  passport.use(
    new FacebookPassport.Strategy(
      {
        clientID: config.authentication.facebook.clientID,
        clientSecret: config.authentication.facebook.clientSecret,
        callbackURL: '/auth/facebook/redirect',
        profileFields: ['id', 'displayName', 'photos', 'email'],
      },
      async (accessToken, refreshToken, profile, cb) => {
        console.log(profile);
        const email = profile.emails[0].value;
        const name = profile.displayName;
        const avatar = profile.photos[0].value;
        const facebookId = profile.id;

        const mongoUser = await userCollection.findOne({ email });
        if (mongoUser) {
          cb(null, formatUser(mongoUser));
          return;
        }

        const userFields = {
          _id: uuid(),
          createdAt: new Date(),
          email,
          name,
          avatar,
          facebook: {
            id: facebookId,
          },
        };

        await userCollection.insertOne(userFields);
        cb(null, formatUser(userFields));
      }
    )
  );

  const app = express();
  app.use(
    cors({
      origin: 'http://localhost:3000',
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

  app.get('/', (req, res) => {
    console.log('yolo', req.user);
    res.status(200).json({ message: 'YOLO' });
  });

  app.get('/auth/success', (req, res) => {
    if (req.user) {
      res.json({
        user: req.user,
        cookies: req.cookies,
      });
    } else {
      res.status(401).json({
        message: 'user failed to authenticate',
      });
    }
  });

  app.get('/auth/failed', (_req, res) => {
    res.status(401).json({
      message: 'user failed to authenticate.',
    });
  });

  app.get('/auth/logout', (req, res) => {
    req.logout();
    res.redirect(CLIENT_HOME_PAGE_URL);
  });

  app.get('/auth/twitter', passport.authenticate('twitter'));

  app.get(
    '/auth/twitter/redirect',
    passport.authenticate('twitter', {
      successRedirect: CLIENT_HOME_PAGE_URL,
      failureRedirect: '/auth/failed',
    })
  );

  app.get(
    '/auth/facebook',
    passport.authenticate('facebook', { scope: ['email'] })
  );

  app.get(
    '/auth/facebook/redirect',
    passport.authenticate('facebook', {
      successRedirect: CLIENT_HOME_PAGE_URL,
      failureRedirect: '/auth/failed',
    })
  );

  const port = config.port;
  app.listen(port, () => console.log(`server running on port ${port}`));
};

init();
