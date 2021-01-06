import passport from 'passport';
import TwitterPassport from 'passport-twitter';
import FacebookPassport from 'passport-facebook';
import GooglePassport from 'passport-google-oauth20';
import SerializeUser from '../passport/serializeUser';
import DeserializeUser from '../passport/deserializeUser';
import VerifyFacebook from '../passport/verifyFacebook';
import VerifyTwitter from '../passport/verifyTwitter';
import VerifyGoogle from '../passport/verifyGoogle';

const setupPassport = (services) => {
  const { config } = services;
  passport.serializeUser(SerializeUser());
  passport.deserializeUser(DeserializeUser(services));

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
      VerifyTwitter(services)
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
      VerifyFacebook(services)
    )
  );

  passport.use(
    new GooglePassport.Strategy(
      {
        clientID: config.authentication.google.clientID,
        clientSecret: config.authentication.google.clientSecret,
        callbackURL: '/auth/google/redirect',
      },
      VerifyGoogle(services)
    )
  );
};

export default setupPassport;
