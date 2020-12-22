const passport = require('passport');
const TwitterPassport = require('passport-twitter');
const FacebookPassport = require('passport-facebook');
const SerializeUser = require('../passport/serializeUser');
const DeserializeUser = require('../passport/deserializeUser');
const VerifyFacebook = require('../passport/verifyFacebook');
const VerifyTwitter = require('../passport/verifyTwitter');

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
};

module.exports = setupPassport;
