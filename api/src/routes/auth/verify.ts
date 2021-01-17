import { ControllerCreator } from '../controller';

const verifyController: ControllerCreator = ({ config }) => async (req) => ({
  status: 200,
  body: {
    user: req.user,
    pushPublicKey: config.push.publicKey,
  },
});

export default verifyController;
