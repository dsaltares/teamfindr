import passport from 'passport';
import withPassport from '@lib/passport/withPassport';

export default withPassport((req, res) => {
  req.session.redirect = req.query.redirect as string;
  passport.authenticate('facebook', { scope: ['email'] })(req, res);
});
