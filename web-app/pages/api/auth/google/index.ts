import passport from 'passport';
import createRoute from '@lib/api/createRoute';

export default createRoute({
  requireAuth: false,
  endpoints: [
    {
      method: 'get',
      rawHandler: (req, res) => {
        req.session.redirect = req.query.redirect as string;
        passport.authenticate('google', { scope: ['email', 'profile'] })(
          req,
          res
        );
      },
    },
  ],
});
