import passport from 'passport';
import { authRoute } from '@lib/api/createRoute';

export default authRoute((req, res) => {
  req.session.redirect = req.query.redirect as string;
  passport.authenticate('facebook', { scope: ['email'] })(req, res);
});
