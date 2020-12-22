const passport = require('passport');
const VerifyController = require('../controllers/auth/verify');
const FailedController = require('../controllers/auth/failed');
const LogoutController = require('../controllers/auth/logout');

const CLIENT_HOME_PAGE_URL = 'http://localhost:3000';

const authRoutes = {
  basePath: '/auth',
  routes: [
    {
      method: 'get',
      path: 'verify',
      controller: VerifyController,
      requiresAuthentication: true,
    },
    {
      method: 'get',
      path: 'failed',
      controller: FailedController,
    },
    {
      method: 'get',
      path: 'logout',
      controller: LogoutController,
    },
    {
      method: 'get',
      path: 'twitter',
      handler: passport.authenticate('twitter'),
    },
    {
      method: 'get',
      path: 'twitter/redirect',
      handler: passport.authenticate('twitter', {
        successRedirect: CLIENT_HOME_PAGE_URL,
        failureRedirect: '/auth/failed',
      }),
    },
    {
      method: 'get',
      path: 'facebook',
      handler: passport.authenticate('facebook'),
    },
    {
      method: 'get',
      path: 'facebook/redirect',
      handler: passport.authenticate('facebook', {
        successRedirect: CLIENT_HOME_PAGE_URL,
        failureRedirect: '/auth/failed',
      }),
    },
    {
      method: 'get',
      path: 'google',
      handler: passport.authenticate('google', { scope: ['email', 'profile'] }),
    },
    {
      method: 'get',
      path: 'google/redirect',
      handler: passport.authenticate('google', {
        successRedirect: CLIENT_HOME_PAGE_URL,
        failureRedirect: '/auth/failed',
      }),
    },
  ],
};

module.exports = authRoutes;
