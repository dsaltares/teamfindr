import passport from 'passport';
import { authRoute } from '@lib/api/createRoute';

export default authRoute((req, res, next) => {
  req.session.redirect = req.query.redirect as string;
  passport.authenticate('twitter')(req, res, next);
});
