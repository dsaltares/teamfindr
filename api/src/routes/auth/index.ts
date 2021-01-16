import passport from 'passport';
import VerifyController from './verify';
import FailedController from './failed';
import LogoutController from './logout';
import { RouteDefinitions } from '../routeDef';

const authRoutes: RouteDefinitions = {
  basePath: '/auth',
  routes: (config) => [
    {
      method: 'get',
      path: 'verify',
      controller: VerifyController,
      requiresAuthentication: true,
      renewSession: true,
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
      handler: (req, res) => {
        req.session.redirect = req.query.redirect as string;
        return passport.authenticate('twitter')(req, res);
      },
    },
    {
      method: 'get',
      path: 'twitter/redirect',
      handler: (req, res) => {
        passport.authenticate('twitter', {
          successRedirect: req.session.redirect || config.clientUrl,
          failureRedirect: '/auth/failed',
        })(req, res);
      },
    },
    {
      method: 'get',
      path: 'facebook',
      handler: (req, res) => {
        req.session.redirect = req.query.redirect as string;
        return passport.authenticate('facebook', { scope: ['email'] })(
          req,
          res
        );
      },
    },
    {
      method: 'get',
      path: 'facebook/redirect',
      handler: (req, res) => {
        passport.authenticate('facebook', {
          successRedirect: req.session.redirect || config.clientUrl,
          failureRedirect: '/auth/failed',
        })(req, res);
      },
    },
    {
      method: 'get',
      path: 'google',
      handler: (req, res) => {
        req.session.redirect = req.query.redirect as string;
        return passport.authenticate('google', { scope: ['email', 'profile'] })(
          req,
          res
        );
      },
    },
    {
      method: 'get',
      path: 'google/redirect',
      handler: (req, res) => {
        passport.authenticate('google', {
          successRedirect: req.session.redirect || config.clientUrl,
          failureRedirect: '/auth/failed',
        })(req, res);
      },
    },
  ],
};

export default authRoutes;
