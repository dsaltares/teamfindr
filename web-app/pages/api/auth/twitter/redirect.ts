import passport from 'passport';
import Config from '@lib/config';
import withPassport from '@lib/passport/withPassport';

export default withPassport((req, res) => {
  passport.authenticate(
    'twitter',
    {
      failureRedirect: '/api/auth/failed',
    },
    () => res.redirect(req.session.redirect || Config.hostUrl)
  )(req, res);
});
