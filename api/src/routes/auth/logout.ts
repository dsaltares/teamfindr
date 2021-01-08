import { ControllerCreator } from '../controller';

const logoutController: ControllerCreator = ({ config }) => async (req) => {
  req.logout();
  return {
    redirect: config.clientUrl,
  };
};

export default logoutController;
