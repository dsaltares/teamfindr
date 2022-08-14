import passport from 'passport';
import TwitterPassport from 'passport-twitter';
import FacebookPassport from 'passport-facebook';
import GooglePassport from 'passport-google-oauth20';
import Config from '@lib/config';
import serializeUser from './serializeUser';
import deserializeUser from './deserializeUser';
import verifyFacebook from './verifyFacebook';
import verifyTwitter from './verifyTwitter';
import verifyGoogle from './verifyGoogle';

const setUpPassport = () => {
  passport.serializeUser(serializeUser);
  passport.deserializeUser(deserializeUser);

  passport.use(
    new TwitterPassport.Strategy(
      {
        consumerKey: Config.authentication.twitter.clientId,
        consumerSecret: Config.authentication.twitter.clientSecret,
        callbackURL: `${Config.hostUrl}/api/auth/twitter/redirect`,
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
        callbackURL: `${Config.hostUrl}/api/auth/facebook/redirect`,
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
        callbackURL: `${Config.hostUrl}/api/auth/google/redirect`,
      },
      verifyGoogle
    )
  );
};

export default setUpPassport;
