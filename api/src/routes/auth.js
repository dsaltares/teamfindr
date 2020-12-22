const passport = require('passport');
const SuccessController = require('../controllers/auth/success');
const FailedController = require('../controllers/auth/failed');
const LogoutController = require('../controllers/auth/logout');

const CLIENT_HOME_PAGE_URL = 'http://localhost:3000';

const authRoutes = {
  basePath: '/auth',
  routes: [
    {
      method: 'get',
      path: 'success',
      controller: SuccessController,
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
  ],
};

module.exports = authRoutes;
