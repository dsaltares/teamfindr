import { ControllerCreator } from '../controller';

const verifyController: ControllerCreator = () => async (req) => ({
  status: 200,
  body: {
    user: req.user,
  },
});

export default verifyController;
