import { Controller } from '../routes/controller';

const withRenewSession = (controller: Controller): Controller => async (
  req
) => {
  // The Set-Cookie header will only be sent to the client if a property of the
  // session has changed.
  // https://stackoverflow.com/questions/40229782/react-cookie-reactjs-how-to-set-expiration-time-for-a-cookie/40229947
  req.session.forceRenew = new Date();
  return controller(req);
};

export default withRenewSession;
