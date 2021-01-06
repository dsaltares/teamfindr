import passport from 'passport';
import VerifyController from './verify';
import FailedController from './failed';
import LogoutController from './logout';

const authRoutes = {
  basePath: '/auth',
  routes: (config) => [
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
        successRedirect: config.clientUrl,
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
        successRedirect: config.clientUrl,
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
        successRedirect: config.clientUrl,
        failureRedirect: '/auth/failed',
      }),
    },
  ],
};

export default authRoutes;
