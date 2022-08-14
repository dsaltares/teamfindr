import passport from 'passport';
import Config from '@lib/config';
import { authRoute } from '@lib/api/createRoute';

export default authRoute((req, res) => {
  passport.authenticate(
    'google',
    {
      failureRedirect: '/api/auth/failed',
    },
    (_err, user) => {
      req.login(user, () =>
        res.redirect(req.session.redirect || Config.hostUrl)
      );
    }
  )(req, res);
});
